```ts
import { NextResponse } from "next/server";
import type { CartItem } from "@/lib/types";

export async function GET(){
  const items: CartItem[] = [
    { product: { id:"p1", name:"Café Péyi", description:"", price:1299, origin:"local", vendor:{id:"v1", name:"Maison Péyi"} }, qty: 2 },
    { product: { id:"p3", name:"Mixeur portable", description:"", price:3999, origin:"import", supplier:{id:"s1", name:"Zendrop"} }, qty: 1 }
  ];
  return NextResponse.json(items);
}
```