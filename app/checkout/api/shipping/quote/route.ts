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