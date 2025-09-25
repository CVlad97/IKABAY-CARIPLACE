<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { TtomForwarderAdapter } from '@/integrations/ttom/TtomForwarderAdapter';
import { createClient } from '@supabase/supabase-js';

const SeaBookingRequestSchema = z.object({
  orders: z.array(z.object({
    id: z.string().uuid(),
    reference: z.string(),
    items: z.array(z.object({
      sku: z.string(),
      description: z.string(),
      quantity: z.number(),
      weight: z.number(),
      value: z.number(),
      hs_code: z.string().optional()
    }))
  })),
  shipper: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    email: z.string(),
    phone: z.string()
  }),
  consignee: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    email: z.string(),
    phone: z.string()
  })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedRequest = SeaBookingRequestSchema.parse(body);

    const ttomAdapter = new TtomForwarderAdapter();
    
    // Créer le booking TTOM
    const booking = await ttomAdapter.book(validatedRequest);

    // Sauvegarder dans Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    // Créer une expédition pour chaque commande
    const shipmentPromises = validatedRequest.orders.map(order => 
      supabase
        .from('shipments')
        .insert({
          order_id: order.id,
          provider: 'ttom',
          mode: 'sea',
          tracking_number: booking.bookingReference,
          label_url: booking.manifestUrl,
          cost: 0, // Coût à répartir
          currency: 'EUR',
          status: 'booked',
          provider_data: {
            booking_reference: booking.bookingReference,
            manifest_url: booking.manifestUrl,
            packing_list_url: booking.packingListUrl,
            estimated_departure: booking.estimatedDeparture,
            estimated_arrival: booking.estimatedArrival
          }
        })
    );

    await Promise.all(shipmentPromises);

    return NextResponse.json({
      success: true,
      booking: {
        bookingReference: booking.bookingReference,
        manifestUrl: booking.manifestUrl,
        packingListUrl: booking.packingListUrl,
        estimatedDeparture: booking.estimatedDeparture,
        estimatedArrival: booking.estimatedArrival
      }
    });

  } catch (error) {
    console.error('Sea booking error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create sea booking'
    }, { status: 500 });
  }
}
=======
```ts
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){
  const payload = await req.json();
  return NextResponse.json({ ok: true, forwarder: "TTOM", manifestId: `MAN-${Date.now()}`, payload });
}
```
>>>>>>> feat/full-marketplace-revamp
