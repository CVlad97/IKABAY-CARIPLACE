```ts
import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/lib/types";

const MOCK: Product[] = [
  { id: "p1", name: "Café Péyi", description: "Torréfié en Martinique.", price: 1299, origin: "local", vendor: { id: "v1", name: "Maison Péyi", story: "Famille de producteurs depuis 1952." } },
  { id: "p2", name: "Rhum arrangé", description: "Macération ananas/vanille.", price: 2599, origin: "local", vendor: { id: "v2", name: "Ti Punch Lab", story: "Atelier artisanal à Fort-de-France." } },
  { id: "p3", name: "Mixeur portable", description: "Sourcé via Zendrop.", price: 3999, origin: "import", supplier: { id: "s1", name: "Zendrop", source_url: "https://app.zendrop.com/product/xyz" } },
  { id: "p4", name: "Lampe LED", description: "AutoDS – dropshipping.", price: 1899, origin: "import", supplier: { id: "s2", name: "AutoDS", source_url: "https://app.autods.com/product/abc" } }
];

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.searchParams.get("origin");
  const data = origin && ["local","import"].includes(origin) ? MOCK.filter(p=>p.origin===origin) : MOCK;
  return NextResponse.json(data);
}
```
