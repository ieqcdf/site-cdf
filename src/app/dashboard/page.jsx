"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function verificarSessao() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      } else {
        setUsuario(data.session.user);
      }
    }
    verificarSessao();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!usuario) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Bem-vindo(a), {usuario.email}
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/eventos/form")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Cadastrar Evento
        </button>
        <button
          onClick={() => router.push("/eventos")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Ver Eventos
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </main>
  );
}
