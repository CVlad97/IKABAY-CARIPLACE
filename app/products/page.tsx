```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductsPage() {
  const [origin, setOrigin] = useState<"all" | "local" | "import">("all");
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { fetch(`/api/products${origin!=="all"?`?origin=${origin}`:""}`).then(r=>r.json()).then(setProducts); }, [origin]);

  return (
    <section className="grid gap-4">
      <div className="flex items-center gap-3">
        <button onClick={()=>setOrigin("all")} className={`btn ${origin==="all"?"btn-primary":""}`}>Tous</button>
        <button onClick={()=>setOrigin("local")} className={`btn ${origin==="local"?"btn-primary":""}`}>🌴 Locaux</button>
        <button onClick={()=>setOrigin("import")} className={`btn ${origin==="import"?"btn-primary":""}`}>🌍 Import</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <article key={p.id} className="card p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.name}</h3>
              <span className={`badge ${p.origin==="local"?"bg-caribGreen/10 text-caribGreen":"bg-caribBlue/10 text-caribBlue"}`}>{p.origin==="local"?"🌴 Local":"🌍 Import"}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{p.description}</p>
            {p.origin === "local" && p.vendor && (
              <p className="text-xs text-gray-500 mt-1">Producteur: {p.vendor.name}</p>
            )}
            {p.origin === "import" && p.supplier && (
              <p className="text-xs text-gray-500 mt-1">Fournisseur: {p.supplier.name}</p>
            )}
            <div className="flex items-center justify-between mt-3">
              <span className="font-semibold">{(p.price/100).toFixed(2)} €</span>
              <Link href={`/cart?add=${p.id}`} className="btn btn-primary">Ajouter</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```
