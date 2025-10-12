import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try { const body = await req.json();
    const notice = process.env.STRIPE_SECRET_KEY ? undefined : "connect_required";
    return NextResponse.json({ ok: true, notice });
  } catch (e:any) { return NextResponse.json({ ok:false, error:e?.message||"bad" }, { status:400 }); }
}