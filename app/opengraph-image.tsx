import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ikabay - Marketplace Caraïbe'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #17c0eb 0%, #1dd1a1 50%, #feca57 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          Ikabay
        </div>
        <div
          style={{
            fontSize: 40,
            opacity: 0.9,
            textAlign: 'center',
          }}
        >
          Marketplace Caraïbe
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.8,
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Produits locaux • Livraison rapide • Paiements sécurisés
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}