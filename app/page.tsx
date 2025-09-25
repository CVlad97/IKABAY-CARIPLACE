```tsx
import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-6">
      <div className="card p-8 bg-gradient-to-br from-caribBlue/10 to-caribSun/10">
        <h1 className="text-3xl font-bold mb-2">Marketplace caribéenne, style Amazon</h1>
        <p className="text-gray-600">Produits locaux avec storytelling producteur, et produits import via AutoDS/Zendrop. Shipping DOM (DHL/TTOM) & Paiements Revolut.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/products" className="btn btn-primary">Voir le catalogue</Link>
          <Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Café Péyi", "Rhum arrangé", "Cosmétiques naturels"].map((name, i) => (
          <article key={i} className="card p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{name}</h3>
              <span className="badge bg-caribGreen/10 text-caribGreen">🌴 Local</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Soutiens les producteurs de la Martinique. Storytelling disponible.</p>
            <Link href="/products" className="btn btn-primary mt-4">Découvrir</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
```
