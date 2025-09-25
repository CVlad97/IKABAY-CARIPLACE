#!/usr/bin/env tsx

/**
 * Script de génération des payouts vendeurs
 * Calcule et génère les virements hebdomadaires via Revolut Business
 * Usage: npm run payouts
 */

import { RevolutBusinessAdapter } from '../integrations/revolut/RevolutBusinessAdapter';
import { createClient } from '@supabase/supabase-js';

interface VendorPayout {
  vendor_id: string;
  vendor_name: string;
  vendor_email: string;
  total_sales: number;
  commission_rate: number;
  commission_amount: number;
  payout_amount: number;
  orders_count: number;
  period_start: string;
  period_end: string;
}

async function generateVendorPayouts() {
  console.log('💰 Génération des payouts vendeurs...');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  // Période: semaine dernière (lundi à dimanche)
  const now = new Date();
  const lastMonday = new Date(now);
  lastMonday.setDate(now.getDate() - now.getDay() - 6); // Lundi dernier
  lastMonday.setHours(0, 0, 0, 0);

  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);
  lastSunday.setHours(23, 59, 59, 999);

  console.log(`📅 Période: ${lastMonday.toLocaleDateString('fr-FR')} - ${lastSunday.toLocaleDateString('fr-FR')}`);

  // Récupérer les ventes de la période
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      products!inner(vendor_id, vendors(name, contact_email))
    `)
    .eq('status', 'delivered') // Seulement les commandes livrées
    .gte('created_at', lastMonday.toISOString())
    .lte('created_at', lastSunday.toISOString());

  if (error) {
    console.error('❌ Erreur récupération commandes:', error);
    return;
  }

  if (!orders || orders.length === 0) {
    console.log('ℹ️ Aucune commande livrée pour la période');
    return;
  }

  console.log(`📦 ${orders.length} commandes livrées trouvées`);

  // Grouper par vendeur
  const vendorSales = new Map<string, {
    vendor_id: string;
    vendor_name: string;
    vendor_email: string;
    orders: any[];
    total_sales: number;
  }>();

  for (const order of orders) {
    // Extraire les items du vendeur de cette commande
    const items = Array.isArray(order.items) ? order.items : [];
    
    for (const item of items) {
      // Trouver le produit correspondant
      const product = order.products?.find((p: any) => p.id === item.product_id);
      if (!product?.vendor_id) continue;

      const vendorId = product.vendor_id;
      const vendorName = product.vendors?.name || 'Vendeur Inconnu';
      const vendorEmail = product.vendors?.contact_email || '';

      if (!vendorSales.has(vendorId)) {
        vendorSales.set(vendorId, {
          vendor_id: vendorId,
          vendor_name: vendorName,
          vendor_email: vendorEmail,
          orders: [],
          total_sales: 0
        });
      }

      const vendor = vendorSales.get(vendorId)!;
      vendor.orders.push({ ...order, item });
      vendor.total_sales += (item.price * item.quantity);
    }
  }

  if (vendorSales.size === 0) {
    console.log('ℹ️ Aucun vendeur à payer pour cette période');
    return;
  }

  console.log(`👥 ${vendorSales.size} vendeurs à traiter`);

  // Calculer les payouts
  const payouts: VendorPayout[] = [];
  const revolutAdapter = new RevolutBusinessAdapter();

  for (const [vendorId, vendorData] of vendorSales) {
    const commissionRate = 0.08; // 8% de commission IKABAY
    const commissionAmount = vendorData.total_sales * commissionRate;
    const payoutAmount = vendorData.total_sales - commissionAmount;

    // Minimum de payout (éviter les micro-virements)
    if (payoutAmount < 10) {
      console.log(`⚠️ ${vendorData.vendor_name}: payout trop faible (€${payoutAmount.toFixed(2)}) - reporté`);
      continue;
    }

    const vendorPayout: VendorPayout = {
      vendor_id: vendorId,
      vendor_name: vendorData.vendor_name,
      vendor_email: vendorData.vendor_email,
      total_sales: vendorData.total_sales,
      commission_rate: commissionRate,
      commission_amount: commissionAmount,
      payout_amount: payoutAmount,
      orders_count: vendorData.orders.length,
      period_start: lastMonday.toISOString(),
      period_end: lastSunday.toISOString()
    };

    payouts.push(vendorPayout);

    console.log(`💳 ${vendorData.vendor_name}: €${payoutAmount.toFixed(2)} (${vendorData.orders.length} commandes)`);
  }

  if (payouts.length === 0) {
    console.log('ℹ️ Aucun payout à générer (montants trop faibles)');
    return;
  }

  // Générer les virements Revolut
  const successfulPayouts = [];
  const failedPayouts = [];

  for (const payout of payouts) {
    if (!payout.vendor_email) {
      console.log(`⚠️ ${payout.vendor_name}: pas d'email - payout ignoré`);
      failedPayouts.push({ ...payout, error: 'No email' });
      continue;
    }

    try {
      const revolutPayout = await revolutAdapter.createPayout({
        beneficiary_email: payout.vendor_email,
        beneficiary_name: payout.vendor_name,
        amount: payout.payout_amount,
        currency: 'EUR',
        reference: `IKABAY-VENDOR-${payout.vendor_id}-${lastMonday.toISOString().split('T')[0]}`
      });

      console.log(`✅ ${payout.vendor_name}: payout créé (${revolutPayout.id})`);
      successfulPayouts.push({ ...payout, revolut_id: revolutPayout.id });

      // Sauvegarder dans la DB
      await supabase
        .from('payouts')
        .insert({
          provider: 'revolut',
          beneficiary_email: payout.vendor_email,
          beneficiary_name: payout.vendor_name,
          amount: payout.payout_amount,
          currency: 'EUR',
          reference: `VENDOR-${payout.vendor_id}-${lastMonday.toISOString().split('T')[0]}`,
          status: revolutPayout.state,
          provider_payout_id: revolutPayout.id,
          provider_data: {
            ...revolutPayout,
            vendor_payout: payout
          }
        });

    } catch (error) {
      console.error(`❌ ${payout.vendor_name}: erreur payout -`, error);
      failedPayouts.push({ 
        ...payout, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }

    // Pause entre les payouts
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Logger le résumé
  await supabase
    .from('event_logs')
    .insert({
      event: 'vendor_payouts_generated',
      payload: {
        period_start: lastMonday.toISOString(),
        period_end: lastSunday.toISOString(),
        total_vendors: payouts.length,
        successful_payouts: successfulPayouts.length,
        failed_payouts: failedPayouts.length,
        total_amount: successfulPayouts.reduce((sum, p) => sum + p.payout_amount, 0),
        successful_payouts: successfulPayouts,
        failed_payouts: failedPayouts
      }
    });

  console.log(`\n📊 Résumé des payouts:`);
  console.log(`   ✅ Réussis: ${successfulPayouts.length}`);
  console.log(`   ❌ Échoués: ${failedPayouts.length}`);
  console.log(`   💰 Montant total: €${successfulPayouts.reduce((sum, p) => sum + p.payout_amount, 0).toFixed(2)}`);

  if (failedPayouts.length > 0) {
    console.log(`\n⚠️ Payouts échoués:`);
    failedPayouts.forEach(p => {
      console.log(`   ${p.vendor_name}: ${p.error}`);
    });
  }
}

// Fonction pour vérifier les statuts des payouts en cours
async function checkPayoutStatuses() {
  console.log('🔍 Vérification des statuts payouts...');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  // Récupérer les payouts en cours
  const { data: payouts } = await supabase
    .from('payouts')
    .select('*')
    .eq('provider', 'revolut')
    .in('status', ['pending', 'processing']);

  if (!payouts || payouts.length === 0) {
    console.log('ℹ️ Aucun payout en cours');
    return;
  }

  const revolutAdapter = new RevolutBusinessAdapter();

  for (const payout of payouts) {
    if (!payout.provider_payout_id) continue;

    try {
      const revolutPayout = await revolutAdapter.getPayout(payout.provider_payout_id);
      
      if (revolutPayout.state !== payout.status) {
        console.log(`💳 ${payout.beneficiary_name}: ${payout.status} → ${revolutPayout.state}`);
        
        // Mettre à jour le statut
        await supabase
          .from('payouts')
          .update({ 
            status: revolutPayout.state,
            completed_at: revolutPayout.completed_at,
            provider_data: revolutPayout
          })
          .eq('id', payout.id);
      }
    } catch (error) {
      console.error(`❌ Erreur statut payout ${payout.id}:`, error);
    }
  }
}

// Exécution
async function main() {
  try {
    await generateVendorPayouts();
    await checkPayoutStatuses();
  } catch (error) {
    console.error('❌ Erreur générale:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}