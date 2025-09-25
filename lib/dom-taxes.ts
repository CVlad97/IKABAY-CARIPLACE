```ts
// DOM Martinique: TVA 8.5% + octroi (simple mock 2%)
export function computeDomTaxes(subtotalCents: number){
  const tva = Math.round(subtotalCents * 0.085);
  const octroi = Math.round(subtotalCents * 0.02);
  return { tva, octroi };
}
```