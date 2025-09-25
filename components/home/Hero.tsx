// components/home/Hero.tsx
"use client";

import { useSupabase } from "@/lib/supabase-provider";
import { useWallet } from "@solana/wallet-adapter-react";
// ... tes autres imports

const Hero = () => {
  const { user } = useSupabase(); // <- maintenant c'est bien une fonction
  const { connect } = useWallet();

  // ...
};
export default Hero;
