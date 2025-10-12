import { NextResponse } from "next/server";
export async function POST(req: Request) {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    return NextResponse.json({ ok:false, notice:"TG not configured" }, { status: 503 });
  }
  const body = await req.json().catch(()=>({}));
  return NextResponse.json({ ok:true });
}