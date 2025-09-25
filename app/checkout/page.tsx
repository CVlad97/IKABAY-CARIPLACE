```tsx
"use client";
import { useState } from "react";

export default function CheckoutPage(){
  const [status, setStatus] = useState<string>("");
  const pay = async () => {
    setStatus("Paiement en cours…");
    const r = await fetch("/api/pay/revolut/checkout", { method: "POST" });
    const j = await r.json();
    setStatus(j.message || "OK");
  };
  return (
    <section className="card p-6">
      <h1 className="text-2xl font-bold mb-2">Paiement</h1>
      <p className="text-sm text-gray-600">Simulation Revolut Merchant (mode démo).</p>
      <button onClick={pay} className="btn btn-primary mt-4">Payer maintenant</button>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </section>
  );
}
```
