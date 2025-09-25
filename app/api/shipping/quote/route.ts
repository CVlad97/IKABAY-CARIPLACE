<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DhlExpressAdapter } from '@/integrations/dhl/DhlExpressAdapter';
import { TtomForwarderAdapter } from '@/integrations/ttom/TtomForwarderAdapter';

const QuoteRequestSchema = z.object({
  from: z.object({
    countryCode: z.string(),
    postalCode: z.string(),
    cityName: z.string()
  }),
  to: z.object({
    countryCode: z.string(),
    postalCode: z.string(),
    cityName: z.string()
  }),
  packages: z.array(z.object({
    weight: z.number(),
    length: z.number(),
    width: z.number(),
    height: z.number()
  }))
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedRequest = QuoteRequestSchema.parse(body);

    const dhlAdapter = new DhlExpressAdapter();
    const ttomAdapter = new TtomForwarderAdapter();

    // Obtenir les tarifs air (DHL) et mer (TTOM) en parallèle
    const [airRates, seaRates] = await Promise.allSettled([
      dhlAdapter.quoteRates(validatedRequest),
      ttomAdapter.quoteRates(validatedRequest)
    ]);

    const allRates = [];

    // Ajouter les tarifs air
    if (airRates.status === 'fulfilled') {
      allRates.push(...airRates.value.map(rate => ({
        ...rate,
        mode: 'air' as const,
        provider: 'dhl'
      })));
    }

    // Ajouter les tarifs mer
    if (seaRates.status === 'fulfilled') {
      allRates.push(...seaRates.value.map(rate => ({
        ...rate,
        mode: 'sea' as const,
        provider: 'ttom'
      })));
    }

    // Trier et catégoriser
    const sortedByPrice = [...allRates].sort((a, b) => a.totalPrice - b.totalPrice);
    const sortedBySpeed = [...allRates].sort((a, b) => {
      const aSpeed = a.mode === 'air' ? 1 : 10; // Air plus rapide
      const bSpeed = b.mode === 'air' ? 1 : 10;
      return aSpeed - bSpeed;
    });

    // Sélectionner les 3 meilleures options
    const cheapest = sortedByPrice[0];
    const fastest = sortedBySpeed[0];
    const best = allRates.find(rate => 
      rate.mode === 'air' && rate.totalPrice <= (cheapest?.totalPrice || 0) * 1.5
    ) || cheapest;

    return NextResponse.json({
      success: true,
      options: {
        cheapest: cheapest || null,
        fastest: fastest || null,
        best: best || null
      },
      all_rates: allRates
    });

  } catch (error) {
    console.error('Shipping quote error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to get shipping quotes'
    }, { status: 500 });
  }
}
=======
```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const body = await req.json();
  // Simulation : retourne deux offres (DHL air / TTOM mer)
  const offers = [
    { carrier: "DHL Express", mode: "air", etaDays: 3, price: 2599 },
    { carrier: "TTOM", mode: "sea", etaDays: 9, price: 1499 }
  ];
  return NextResponse.json({ ok: true, offers, request: body });
}
```
>>>>>>> feat/full-marketplace-revamp
