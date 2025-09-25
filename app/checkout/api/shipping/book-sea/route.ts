```ts
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){
  const payload = await req.json();
  return NextResponse.json({ ok: true, forwarder: "TTOM", manifestId: `MAN-${Date.now()}`, payload });
}
```