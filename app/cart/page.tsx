```tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";
import { computeDomTaxes } from "@/lib/dom-taxes";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(()=>{ fetch("/api/orders?mode=cart").then(r=>r.json()).then(setItems); },[]);

  const { subtotal, tva, octroi, total } = useMemo(()=>{
    const subtotal = items.reduce((s,i)=> s + i.product.price * i.qty, 0);
    const taxes = computeDomTaxes(subtotal);
    return { subtotal, ...taxes, total: subtotal + taxes.tva + taxes.octroi };
  }, [items]);

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-bold">Panier</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 card p-4">
          {items.length===0 && <p className="text-gray-600">Votre panier est vide.</p>}
          <ul className="divide-y">
            {items.map((it)=> (
              <li key={it.product.id} className="py-3 flex items-center justify-between">
                <span>{it.product.name} × {it.qty}</span>
                <span>{((it.product.price*it.qty)/100).toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="card p-4">
          <h2 className="font-semibold mb-2">Récapitulatif</h2>
          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span>Sous-total</span><span>{(subtotal/100).toFixed(2)} €</span></div>
            <div className="flex justify-between"><span>TVA (8,5%)</span><span>{(tva/100).toFixed(2)} €</span></div>
            <div className="flex justify-between"><span>Octroi de mer</span><span>{(octroi/100).toFixed(2)} €</span></div>
            <div className="flex justify-between font-semibold pt-2 border-t"><span>Total</span><span>{(total/100).toFixed(2)} €</span></div>
          </div>
          <a href="/checkout" className="btn btn-primary mt-3 w-full text-center">Valider & Payer</a>
        </aside>
      </div>
    </section>
  );
}
```
