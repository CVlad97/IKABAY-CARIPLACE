// lib/supabase-provider.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient, Session, User } from "@supabase/supabase-js";

// ⚠️ Besoin de ces variables dans .env
// NEXT_PUBLIC_SUPABASE_URL=...
// NEXT_PUBLIC_SUPABASE_ANON_KEY=...
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type SupabaseCtx = {
  user: User | null;
  session: Session | null;
  supabase: ReturnType<typeof createClient>;
};

const Ctx = createContext<SupabaseCtx | null>(null);

export function useSupabase() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useSupabase doit être utilisé à l'intérieur de <SupabaseProvider>.");
  }
  return ctx;
}

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ user: session?.user ?? null, session, supabase }),
    [session]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
