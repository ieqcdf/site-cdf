"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
        return;
      }
      setUserEmail(data.user.email || "");
    }
    load();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              Painel do líder
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">
              Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Logado como: <span className="font-semibold">{userEmail}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full px-5 py-2 text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            Sair
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Link
            href="/eventos"
            className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-sm transition"
          >
            <h2 className="font-semibold text-gray-900 mb-1">Eventos</h2>
            <p className="text-xs text-gray-600">
              Criar, editar e publicar eventos do ministério.
            </p>
          </Link>

          <Link
            href="/membros"
            className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-sm transition"
          >
            <h2 className="font-semibold text-gray-900 mb-1">Membros</h2>
            <p className="text-xs text-gray-600">
              Cadastro e gestão de membros.
            </p>
          </Link>

          <Link
            href="/ministerios"
            className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-sm transition"
          >
            <h2 className="font-semibold text-gray-900 mb-1">Ministérios</h2>
            <p className="text-xs text-gray-600">
              Páginas e conteúdos por ministério.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
