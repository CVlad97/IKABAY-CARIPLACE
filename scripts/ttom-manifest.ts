#!/usr/bin/env tsx

/**
 * Script de génération des manifestes TTOM
 * Regroupe les commandes SEA J-1 et génère les documents
 * Usage: npm run ttom-manifest
 */

import { TtomForwarderAdapter } from '../integrations/ttom/TtomForwarderAdapter';
import { createClient } from '@supabase/supabase-js';

interface OrderItem {
  sku: string;
  description: string;
  quantity: number;
  weight: number;
  value: number;
  hs_code?: string;
}

interface ConsolidatedOrder {
  id: string;
  reference: string;
  items: OrderItem[];
}

async function generateTtomManifest() {
  console.log('🚢 Génération du manifeste TTOM...');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  // Récupérer les commandes SEA de J-1 non traitées
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('shipping_mode', 'sea')
    .eq('status', 'paid')
    .gte('created_at', yesterday.toISOString())
    .lt('created_at', today.toISOString())
    .is('shipments.id', null); // Pas encore expédiées

  if (error) {
    console.error('❌ Erreur récupération commandes:', error);
    return;
  }

  if (!orders || orders.length === 0) {
    console.log('ℹ️ Aucune commande SEA à traiter pour hier');
    return;
  }

  console.log(`📦 ${orders.length} commandes SEA trouvées`);

  // Convertir en format TTOM
  const consolidatedOrders: ConsolidatedOrder[] = orders.map(order => ({
    id: order.id,
    reference: order.reference,
    items: Array.isArray(order.items) ? order.items.map((item: any) => ({
      sku: item.sku || item.id || 'UNKNOWN',
      description: item.title || item.description || 'Produit',
      quantity: item.quantity || 1,
      weight: item.weight || 0.5, // Poids estimé si non fourni
      value: item.price || 0,
      hs_code: item.hs_code || '9999999999' // Code générique
    })) : []
  }));

  // Informations expéditeur/destinataire par défaut
  const defaultShipper = {
    name: 'IKABAY',
    address: '1 Rue de la Paix',
    city: 'Paris',
    country: 'FR',
    email: 'ops@ikabay.com',
    phone: '+33123456789'
  };

  const defaultConsignee = {
    name: 'IKABAY Martinique',
    address: 'Zone Industrielle',
    city: 'Fort-de-France',
    country: 'MQ',
    email: 'mq@ikabay.com',
    phone: '+596696123456'
  };

  // Générer le booking TTOM
  const ttomAdapter = new TtomForwarderAdapter();

  try {
    const booking = await ttomAdapter.book({
      orders: consolidatedOrders,
      shipper: defaultShipper,
      consignee: defaultConsignee
    });

    console.log('✅ Booking TTOM créé:', booking.bookingReference);

    // Créer les expéditions dans Supabase
    const shipmentPromises = consolidatedOrders.map(order => 
      supabase
        .from('shipments')
        .insert({
          order_id: order.id,
          provider: 'ttom',
          mode: 'sea',
          tracking_number: booking.bookingReference,
          label_url: booking.manifestUrl,
          cost: 0, // Coût à répartir plus tard
          currency: 'EUR',
          status: 'booked',
          provider_data: {
            booking_reference: booking.bookingReference,
            manifest_url: booking.manifestUrl,
            packing_list_url: booking.packingListUrl,
            estimated_departure: booking.estimatedDeparture,
            estimated_arrival: booking.estimatedArrival,
            consolidated_orders: consolidatedOrders.length
          }
        })
    );

    await Promise.all(shipmentPromises);

    // Logger l'événement
    await supabase
      .from('event_logs')
      .insert({
        event: 'ttom_manifest_generated',
        payload: {
          booking_reference: booking.bookingReference,
          orders_count: consolidatedOrders.length,
          total_items: consolidatedOrders.reduce((sum, order) => sum + order.items.length, 0),
          estimated_departure: booking.estimatedDeparture,
          estimated_arrival: booking.estimatedArrival,
          manifest_url: booking.manifestUrl,
          packing_list_url: booking.packingListUrl
        }
      });

    console.log(`📋 Manifeste généré avec ${consolidatedOrders.length} commandes`);
    console.log(`🚢 Départ estimé: ${new Date(booking.estimatedDeparture).toLocaleDateString('fr-FR')}`);
    console.log(`🏝️ Arrivée estimée: ${new Date(booking.estimatedArrival).toLocaleDateString('fr-FR')}`);

    // Afficher le résumé
    const totalWeight = consolidatedOrders.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + (item.weight * item.quantity), 0), 0
    );
    
    const totalValue = consolidatedOrders.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + (item.value * item.quantity), 0), 0
    );

    console.log(`📊 Résumé:`);
    console.log(`   Poids total: ${totalWeight.toFixed(2)} kg`);
    console.log(`   Valeur totale: €${totalValue.toFixed(2)}`);

  } catch (error) {
    console.error('❌ Erreur génération booking:', error);
    
    // Logger l'erreur
    await supabase
      .from('event_logs')
      .insert({
        event: 'ttom_manifest_error',
        payload: {
          error: error instanceof Error ? error.message : 'Unknown error',
          orders_count: consolidatedOrders.length,
          timestamp: new Date().toISOString()
        }
      });
  }
}

// Fonction pour vérifier les statuts des bookings en cours
async function checkBookingStatuses() {
  console.log('📋 Vérification des statuts TTOM...');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  // Récupérer les expéditions TTOM en cours
  const { data: shipments } = await supabase
    .from('shipments')
    .select('*')
    .eq('provider', 'ttom')
    .in('status', ['booked', 'consolidation', 'on_water', 'customs']);

  if (!shipments || shipments.length === 0) {
    console.log('ℹ️ Aucune expédition TTOM en cours');
    return;
  }

  const ttomAdapter = new TtomForwarderAdapter();

  for (const shipment of shipments) {
    try {
      const tracking = await ttomAdapter.track(shipment.tracking_number);
      
      if (tracking.status !== shipment.status) {
        console.log(`📦 ${shipment.tracking_number}: ${shipment.status} → ${tracking.status}`);
        
        // Mettre à jour le statut
        await supabase
          .from('shipments')
          .update({ 
            status: tracking.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', shipment.id);
      }
    } catch (error) {
      console.error(`❌ Erreur tracking ${shipment.tracking_number}:`, error);
    }
  }
}

// Exécution
async function main() {
  try {
    await generateTtomManifest();
    await checkBookingStatuses();
  } catch (error) {
    console.error('❌ Erreur générale:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}