<<<<<<< HEAD
#!/usr/bin/env tsx

/**
 * Script de synchronisation des tarifs DHL Express
 * Usage: npm run sync-rates
 */

import { DhlExpressAdapter } from '../integrations/dhl/DhlExpressAdapter';
import { createClient } from '@supabase/supabase-js';

interface RateSync {
  origin: string;
  destination: string;
  rates: any[];
  synced_at: string;
}

async function syncDhlRates() {
  console.log('🚀 Synchronisation des tarifs DHL Express...');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  const dhlAdapter = new DhlExpressAdapter();

  // Destinations principales
  const routes = [
    {
      from: { countryCode: 'FR', postalCode: '75001', cityName: 'Paris' },
      to: { countryCode: 'MQ', postalCode: '97200', cityName: 'Fort-de-France' },
      name: 'Paris → Martinique'
    },
    {
      from: { countryCode: 'FR', postalCode: '75001', cityName: 'Paris' },
      to: { countryCode: 'GP', postalCode: '97110', cityName: 'Pointe-à-Pitre' },
      name: 'Paris → Guadeloupe'
    },
    {
      from: { countryCode: 'DE', postalCode: '10115', cityName: 'Berlin' },
      to: { countryCode: 'MQ', postalCode: '97200', cityName: 'Fort-de-France' },
      name: 'Berlin → Martinique'
    }
  ];

  // Packages types standards
  const standardPackages = [
    { weight: 0.5, length: 20, width: 15, height: 5 }, // Petit colis
    { weight: 2, length: 30, width: 20, height: 15 },   // Moyen colis
    { weight: 5, length: 40, width: 30, height: 20 }    // Gros colis
  ];

  const results: RateSync[] = [];

  for (const route of routes) {
    console.log(`📦 Synchronisation ${route.name}...`);

    try {
      for (const packages of [standardPackages]) {
        const rates = await dhlAdapter.quoteRates({
          from: route.from,
          to: route.to,
          packages
        });

        const rateSync: RateSync = {
          origin: `${route.from.cityName}, ${route.from.countryCode}`,
          destination: `${route.to.cityName}, ${route.to.countryCode}`,
          rates,
          synced_at: new Date().toISOString()
        };

        results.push(rateSync);

        console.log(`  ✅ ${rates.length} tarifs obtenus`);
        rates.forEach(rate => {
          console.log(`    ${rate.productName}: €${rate.totalPrice} (${rate.deliveryTime})`);
        });
      }

    } catch (error) {
      console.error(`  ❌ Erreur pour ${route.name}:`, error);
    }

    // Pause entre les requêtes pour éviter le rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Sauvegarder les résultats
  if (results.length > 0) {
    const { error } = await supabase
      .from('event_logs')
      .insert({
        event: 'dhl_rates_sync',
        payload: {
          synced_routes: results.length,
          results,
          timestamp: new Date().toISOString()
        }
      });

    if (error) {
      console.error('❌ Erreur sauvegarde:', error);
    } else {
      console.log('💾 Résultats sauvegardés dans event_logs');
    }
  }

  console.log(`\n✨ Synchronisation terminée: ${results.length} routes traitées`);
}

// Validation des créneaux de pickup
async function validatePickupWindows() {
  console.log('🕐 Validation des créneaux de pickup...');

  const dhlAdapter = new DhlExpressAdapter();

  const testLocation = {
    countryCode: 'FR',
    postalCode: '75001',
    cityName: 'Paris',
    addressLine1: '1 Rue de Rivoli',
    name: 'IKABAY',
    phone: '+33123456789',
    email: 'ops@ikabay.com'
  };

  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const pickup = await dhlAdapter.schedulePickup({
      date: tomorrow.toISOString(),
      location: testLocation,
      timeWindow: {
        from: '09:00',
        to: '17:00'
      },
      shipmentDetails: {
        productCode: 'P',
        accounts: [{ typeCode: 'shipper', number: process.env.DHL_EXPRESS_ACCOUNT_NUMBER || '' }]
      }
    });

    console.log('✅ Pickup test réussi:', pickup);

  } catch (error) {
    console.error('❌ Erreur pickup test:', error);
  }
}

// Exécution
async function main() {
  try {
    await syncDhlRates();
    await validatePickupWindows();
  } catch (error) {
    console.error('❌ Erreur générale:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
=======
```ts
console.log("[dhl_rates_sync] Simulation sync tarifs principales routes… done.");
```
>>>>>>> feat/full-marketplace-revamp
