import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { RevolutBusinessAdapter } from '@/integrations/revolut/RevolutBusinessAdapter';
import { createClient } from '@supabase/supabase-js';

const PayoutRequestSchema = z.object({
  beneficiary_email: z.string().email(),
  beneficiary_name: z.string(),
  iban: z.string().optional(),
  bic: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().default('EUR'),
  reference: z.string()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedRequest = PayoutRequestSchema.parse(body);

    const revolutAdapter = new RevolutBusinessAdapter();
    
    // Créer le payout
    const payout = await revolutAdapter.createPayout(validatedRequest);

    // Sauvegarder dans Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    const { error } = await supabase
      .from('payouts')
      .insert({
        provider: 'revolut',
        beneficiary_email: payout.beneficiary.email,
        beneficiary_name: payout.beneficiary.name,
        iban: payout.beneficiary.iban,
        bic: payout.beneficiary.bic,
        amount: payout.amount,
        currency: payout.currency,
        reference: payout.reference,
        status: payout.state,
        provider_payout_id: payout.id,
        provider_data: payout
      });

    if (error) {
      console.error('Failed to save payout:', error);
    }

    return NextResponse.json({
      success: true,
      payout: {
        id: payout.id,
        state: payout.state,
        amount: payout.amount,
        currency: payout.currency,
        reference: payout.reference,
        created_at: payout.created_at
      }
    });

  } catch (error) {
    console.error('Payout creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create payout'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const revolutAdapter = new RevolutBusinessAdapter();
    const payouts = await revolutAdapter.listPayouts(limit);

    return NextResponse.json({
      success: true,
      payouts
    });

  } catch (error) {
    console.error('List payouts error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to list payouts'
    }, { status: 500 });
  }
}