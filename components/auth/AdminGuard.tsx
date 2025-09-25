"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-provider";
import LoadingScreen from "@/components/ui/LoadingScreen";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { supabase, user, loading } = useSupabase();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      // Check if user has admin role
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !data || data.role !== 'admin') {
        router.push('/unauthorized');
        return;
      }

      setIsAdmin(true);
    };

    if (!loading) {
      checkAdminRole();
    }
  }, [user, loading, router, supabase]);

  if (loading || !isAdmin) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}