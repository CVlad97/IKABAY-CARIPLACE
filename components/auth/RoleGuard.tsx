"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-provider";
import LoadingScreen from "@/components/ui/LoadingScreen";

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const { supabase, user, loading } = useSupabase();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}