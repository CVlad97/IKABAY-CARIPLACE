import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DhlExpressAdapter } from '@/integrations/dhl/DhlExpressAdapter';
import { TtomForwarderAdapter } from '@/integrations/ttom/TtomForwarderAdapter';
import { createClient } from '@supabase/supabase-js';

const TrackRequestSchema = z.object({
  trackingNumber: z.string(),
  provider: z.enum(['dhl', 'ttom']).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trackingNumber, provider } = TrackRequestSchema.parse(body);

    // Si provider non spécifié, essayer de le détecter depuis la DB
    let detectedProvider = provider;
    
    if (!detectedProvider) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE!
      );

      const { data: shipment } = await supabase
        .from('shipments')
        .select('provider')
        .eq('tracking_number', trackingNumber)
        .single();

      detectedProvider = shipment?.provider as 'dhl' | 'ttom';
    }

    if (!detectedProvider) {
      return NextResponse.json({
        success: false,
        error: 'Unable to determine shipping provider'
      }, { status: 400 });
    }

    let trackingInfo;

    if (detectedProvider === 'dhl') {
      const dhlAdapter = new DhlExpressAdapter();
      trackingInfo = await dhlAdapter.track(trackingNumber);
    } else if (detectedProvider === 'ttom') {
      const ttomAdapter = new TtomForwarderAdapter();
      trackingInfo = await ttomAdapter.track(trackingNumber);
    } else {
      return NextResponse.json({
        success: false,
        error: 'Unsupported provider'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      provider: detectedProvider,
      tracking: {
        trackingNumber,
        status: trackingInfo.status,
        location: trackingInfo.location,
        timestamp: trackingInfo.timestamp,
        events: trackingInfo.events
      }
    });

  } catch (error) {
    console.error('Tracking error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to track shipment'
    }, { status: 500 });
  }
}