import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try { const body = await req.json();
    return NextResponse.json({ ok: true, ref: `ULTRA-\${Date.now()}` });
  } catch (e:any) { return NextResponse.json({ ok:false, error:e?.message||"bad" }, { status:400 }); }
}