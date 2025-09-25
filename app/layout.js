import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChunkGuard from '@/components/ChunkGuard'

export const metadata = {
  title: 'Ikabay – Marketplace Caraïbe',
  description: 'Local & discount, traçabilité, crypto et virement.',
}

// Évite le pré-rendu figé si tu modifies souvent
export const dynamic = 'force-dynamic'
export default function RootLayout({ children }) {
  const missingEnv =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <ChunkGuard />
        {missingEnv && (
          <div style={{background:'#fff3c4', borderBottom:'1px solid #ffeaa7', padding:'8px 0', textAlign:'center'}}>
            Variables Supabase manquantes. Renseigne NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY.
          </div>
        )}
        
        <Header />
        <main className="container py-6">
          {children}
        </main>
        <Footer />
        <SocialProof />
      </body>
    </html>
  )
}

function SocialProof() {
  return <div id="social-proof"></div>
}