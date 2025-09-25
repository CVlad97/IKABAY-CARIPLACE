```tsx
import { ReactNode } from "react";
import "@/app/globals.css";
import Link from "next/link";

export const metadata = { title: "IKABAY Marketplace", description: "Amazon caribéen – DOM friendly." };

function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="text-2xl font-bold text-caribBlue">IKABAY 🏝️</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/products" className="hover:underline">Produits</Link>
          <Link href="/cart" className="hover:underline">Panier</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="max-w-screen-xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
```
