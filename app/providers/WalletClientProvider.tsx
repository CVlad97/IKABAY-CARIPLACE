// app/providers/WalletClientProvider.tsx
"use client";

import { ReactNode } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
// Si tu as déjà un fichier lib/wallet-provider.tsx, assure-toi qu’il commence par "use client" aussi.

require("@solana/wallet-adapter-react-ui/styles.css");

export default function WalletClientProvider({ children }: { children: ReactNode }) {
  // adapte l'endpoint à ton RPC
  const endpoint = "https://api.mainnet-beta.solana.com";
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
