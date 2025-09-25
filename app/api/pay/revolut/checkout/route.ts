<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { RevolutMerchantAdapter } from '@/integrations/revolut/RevolutMerchantAdapter';

const CheckoutRequestSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('EUR'),
  customer: z.object({
    email: z.string().email(),
    name: z.string().optional()
  }),
  reference: z.string(),
  success_url: z.string().url(),
  cancel_url: z.string().url(),
  description: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedRequest = CheckoutRequestSchema.parse(body);

    const revolutAdapter = new RevolutMerchantAdapter();
    
    const checkout = await revolutAdapter.createCheckout(validatedRequest);

    return NextResponse.json({
      success: true,
      checkout: {
        id: checkout.id,
        public_id: checkout.public_id,
        checkout_url: checkout.checkout_url,
        status: checkout.status
      }
    });

  } catch (error) {
    console.error('Revolut checkout error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create checkout'
    }, { status: 500 });
  }
}
=======
```ts
import { NextResponse } from "next/server";
export async function POST(){
  return NextResponse.json({ ok: true, message: "Paiement simulé réussi via Revolut." });
}
```
>>>>>>> feat/full-marketplace-revamp
