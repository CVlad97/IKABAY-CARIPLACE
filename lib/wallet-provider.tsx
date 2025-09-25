"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  ConnectionProvider, 
  WalletProvider as SolanaWalletProvider, 
  useWallet as useSolanaWallet 
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

type WalletContextType = {
  connected: boolean;
  publicKey: any;
  wallet: any;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendTransaction: (transaction: any) => Promise<string>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function WalletProviderInner({ children }: { children: React.ReactNode }) {
  const { connected, publicKey, wallet, connect, disconnect, sendTransaction } = useSolanaWallet();
  const [tronConnected, setTronConnected] = useState(false);
  const [tronAddress, setTronAddress] = useState<string | null>(null);

  // Simulate TronLink connection
  const connectTron = async () => {
    // In a real app, you would use TronWeb to connect to TronLink
    console.log("Connecting to TronLink...");
    setTronConnected(true);
    setTronAddress("TWDiBSMEgsDHVRwEcFNiPVWZVPjXGZ9JiE");
  };

  const disconnectTron = async () => {
    console.log("Disconnecting from TronLink...");
    setTronConnected(false);
    setTronAddress(null);
  };

  // Combined connect function
  const connectWallet = async () => {
    try {
      // Connect to Solana wallet
      await connect();
      
      // Connect to TronLink
      await connectTron();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Combined disconnect function
  const disconnectWallet = async () => {
    try {
      // Disconnect Solana wallet
      await disconnect();
      
      // Disconnect TronLink
      await disconnectTron();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        connected: connected || tronConnected,
        publicKey,
        wallet,
        connect: connectWallet,
        disconnect: disconnectWallet,
        sendTransaction
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // Set up Solana network
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);

  // Set up supported wallets
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletProviderInner>{children}</WalletProviderInner>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return context;
};