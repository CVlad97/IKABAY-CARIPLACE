<<<<<<< HEAD
// Helpers pour calcul taxes DOM (Martinique)
// À brancher plus tard sur Zonos/Avalara pour calculs précis

export interface DomTaxCalculation {
  cif_value: number;
  tva_rate: number;
  octroi_rate: number;
  tva_amount: number;
  octroi_amount: number;
  total_duties: number;
  total_taxes: number;
  grand_total: number;
}

export function calculateDomTaxes(
  cifValue: number,
  hsCode?: string,
  destinationCountry: string = 'MQ'
): DomTaxCalculation {
  // Taux TVA Martinique
  const tvaRate = destinationCountry === 'MQ' ? 0.085 : 0.20; // 8.5% MQ, 20% FR
  
  // Octroi de mer (simplifié - en réalité dépend du code HS)
  let octroiRate = 0.0;
  
  if (destinationCountry === 'MQ' && hsCode) {
    // Exemples de taux octroi selon HS (à compléter)
    if (hsCode.startsWith('64')) octroiRate = 0.15; // Chaussures
    else if (hsCode.startsWith('61') || hsCode.startsWith('62')) octroiRate = 0.10; // Vêtements
    else if (hsCode.startsWith('85')) octroiRate = 0.05; // Électronique
    else octroiRate = 0.075; // Taux moyen
  }
  
  const octroiAmount = cifValue * octroiRate;
  const tvaBase = cifValue + octroiAmount;
  const tvaAmount = tvaBase * tvaRate;
  
  return {
    cif_value: cifValue,
    tva_rate: tvaRate,
    octroi_rate: octroiRate,
    tva_amount: Math.round(tvaAmount * 100) / 100,
    octroi_amount: Math.round(octroiAmount * 100) / 100,
    total_duties: Math.round(octroiAmount * 100) / 100,
    total_taxes: Math.round(tvaAmount * 100) / 100,
    grand_total: Math.round((cifValue + octroiAmount + tvaAmount) * 100) / 100
  };
}

export function estimateShippingDuties(
  productValue: number,
  shippingCost: number,
  insuranceCost: number = 0,
  hsCode?: string,
  destinationCountry: string = 'MQ'
): DomTaxCalculation {
  // CIF = Cost + Insurance + Freight
  const cifValue = productValue + shippingCost + insuranceCost;
  
  return calculateDomTaxes(cifValue, hsCode, destinationCountry);
}

export function formatTaxBreakdown(calculation: DomTaxCalculation): string {
  return `
Valeur CIF: €${calculation.cif_value}
Octroi de mer (${(calculation.octroi_rate * 100).toFixed(1)}%): €${calculation.octroi_amount}
TVA (${(calculation.tva_rate * 100).toFixed(1)}%): €${calculation.tva_amount}
Total taxes: €${calculation.total_duties + calculation.total_taxes}
Total à payer: €${calculation.grand_total}
  `.trim();
}
=======
```ts
// DOM Martinique: TVA 8.5% + octroi (simple mock 2%)
export function computeDomTaxes(subtotalCents: number){
  const tva = Math.round(subtotalCents * 0.085);
  const octroi = Math.round(subtotalCents * 0.02);
  return { tva, octroi };
}
```
>>>>>>> feat/full-marketplace-revamp
