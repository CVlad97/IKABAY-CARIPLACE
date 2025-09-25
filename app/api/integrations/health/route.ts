import { NextRequest, NextResponse } from 'next/server';
import { DhlExpressAdapter } from '@/integrations/dhl/DhlExpressAdapter';
import { RevolutMerchantAdapter } from '@/integrations/revolut/RevolutMerchantAdapter';
import { RevolutBusinessAdapter } from '@/integrations/revolut/RevolutBusinessAdapter';
import { TtomForwarderAdapter } from '@/integrations/ttom/TtomForwarderAdapter';

export async function POST(request: NextRequest) {
  const healthChecks = {
    dhl: { configured: false, status: 'unknown', error: null as string | null },
    revolut_merchant: { configured: false, status: 'unknown', error: null as string | null },
    revolut_business: { configured: false, status: 'unknown', error: null as string | null },
    ttom: { configured: false, status: 'unknown', error: null as string | null }
  };

  // DHL Express
  try {
    const dhlAdapter = new DhlExpressAdapter();
    healthChecks.dhl.configured = !!(process.env.DHL_EXPRESS_CLIENT_ID && process.env.DHL_EXPRESS_CLIENT_SECRET);
    
    if (healthChecks.dhl.configured) {
      // Test simple quote
      await dhlAdapter.quoteRates({
        from: { countryCode: 'FR', postalCode: '75001', cityName: 'Paris' },
        to: { countryCode: 'MQ', postalCode: '97200', cityName: 'Fort-de-France' },
        packages: [{ weight: 1, length: 10, width: 10, height: 10 }]
      });
      healthChecks.dhl.status = 'ok';
    } else {
      healthChecks.dhl.status = 'not_configured';
    }
  } catch (error) {
    healthChecks.dhl.status = 'error';
    healthChecks.dhl.error = error instanceof Error ? error.message : 'Unknown error';
  }

  // Revolut Merchant
  try {
    const revolutMerchantAdapter = new RevolutMerchantAdapter();
    healthChecks.revolut_merchant.configured = !!(process.env.REVOLUT_MERCHANT_API_KEY);
    
    if (healthChecks.revolut_merchant.configured) {
      healthChecks.revolut_merchant.status = 'ok'; // Pas de test simple disponible
    } else {
      healthChecks.revolut_merchant.status = 'not_configured';
    }
  } catch (error) {
    healthChecks.revolut_merchant.status = 'error';
    healthChecks.revolut_merchant.error = error instanceof Error ? error.message : 'Unknown error';
  }

  // Revolut Business
  try {
    const revolutBusinessAdapter = new RevolutBusinessAdapter();
    healthChecks.revolut_business.configured = !!(
      process.env.REVOLUT_BUSINESS_API_KEY_ID && 
      process.env.REVOLUT_BUSINESS_ORG_ID
    );
    
    if (healthChecks.revolut_business.configured) {
      // Test liste payouts
      await revolutBusinessAdapter.listPayouts(1);
      healthChecks.revolut_business.status = 'ok';
    } else {
      healthChecks.revolut_business.status = 'not_configured';
    }
  } catch (error) {
    healthChecks.revolut_business.status = 'error';
    healthChecks.revolut_business.error = error instanceof Error ? error.message : 'Unknown error';
  }

  // TTOM
  try {
    const ttomAdapter = new TtomForwarderAdapter();
    healthChecks.ttom.configured = !!(process.env.TTOM_CONTACT_EMAIL);
    
    if (healthChecks.ttom.configured) {
      // Test quote
      await ttomAdapter.quoteRates({
        from: { countryCode: 'FR', cityName: 'Rouen' },
        to: { countryCode: 'MQ', cityName: 'Fort-de-France' },
        packages: [{ weight: 1, length: 10, width: 10, height: 10 }]
      });
      healthChecks.ttom.status = 'ok';
    } else {
      healthChecks.ttom.status = 'not_configured';
    }
  } catch (error) {
    healthChecks.ttom.status = 'error';
    healthChecks.ttom.error = error instanceof Error ? error.message : 'Unknown error';
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    health_checks: healthChecks
  });
}