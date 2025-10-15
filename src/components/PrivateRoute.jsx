"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function PrivateRoute({ children }) {
  const [autenticado, setAutenticado] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function verificarSessao() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
      } else {
        setAutenticado(true);
      }

      setVerificando(false);
    }

    verificarSessao();

    // Reage a mudanças de sessão (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push("/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (verificando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  return autenticado ? children : null;
}
