```tsx
export default function DashboardPage(){
  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <article className="card p-4">
          <h3 className="font-semibold">Connecteurs</h3>
          <ul className="mt-2 text-sm text-gray-600 list-disc pl-4">
            <li>DHL Express (simulation)</li>
            <li>TTOM (simulation)</li>
            <li>Revolut Merchant (simulation)</li>
          </ul>
        </article>
        <article className="card p-4">
          <h3 className="font-semibold">Fournisseurs import</h3>
          <p className="text-sm text-gray-600">AutoDS & Zendrop – synchronisation via webhook / script.</p>
        </article>
        <article className="card p-4">
          <h3 className="font-semibold">Journal</h3>
          <p className="text-sm text-gray-600">Les événements (sync tarifs, payouts, manifestes) seront listés ici.</p>
        </article>
      </div>
    </section>
  );
}
```

---