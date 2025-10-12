import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  if (mode === "subscribe" && token && challenge && process.env.WA_VERIFY_TOKEN && token === process.env.WA_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return NextResponse.json({ ok:false }, { status: 403 });
}
export async function POST(req: Request) {
  if (!process.env.WA_ACCESS_TOKEN || !process.env.WA_PHONE_NUMBER_ID) {
    return NextResponse.json({ ok:false, notice:"WA not configured" }, { status: 503 });
  }
  const body = await req.json().catch(()=>({}));
  return NextResponse.json({ ok:true });
}