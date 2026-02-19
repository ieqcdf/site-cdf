"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }

    if (data?.session) router.push("/dashboard");
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-brand-night text-white">
      {/* Fundo com glow dourado/vermelho */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-red/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand-gold/25 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl grid gap-6 lg:grid-cols-2 items-stretch">
          {/* Lado esquerdo: marca e texto */}
          <div className="flex flex-col justify-center px-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-16 w-16">
                <Image
                  src="/logo-catedral.jpg" /* coloque sua logo em /public com esse nome */
                  alt="Catedral da Família"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.30em] text-brand-gold uppercase">
                  Catedral da Família
                </p>
                <h1 className="text-2xl md:text-3xl font-extrabold">
                  Área dos Líderes
                </h1>
                <p className="text-sm text-white/70 mt-1">
                  Acesso restrito para líderes de ministérios.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-white/75 leading-relaxed">
              <p>
                Aqui você poderá publicar eventos, avisos e conteúdos do seu
                ministério com segurança e organização.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  Eventos
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  Membros
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  Ministérios
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/" className="text-sm text-white/70 hover:text-white transition">
                Voltar ao site
              </Link>
              <span className="text-white/30">•</span>
              <span className="text-sm text-white/70">
                Precisa de acesso? Fale com seu líder.
              </span>
            </div>
          </div>

          {/* Lado direito: card do login */}
          <Card className="bg-white/95 backdrop-blur border-white/20 rounded-3xl p-6 md:p-8 text-gray-900">
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.25em] text-brand-red uppercase">
                Entrar
              </p>
              <h2 className="text-2xl font-bold mt-2">Acesse o painel</h2>
              <p className="text-sm text-gray-600 mt-2">
                Use seu e-mail cadastrado e a senha.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold/30"
                  placeholder="lider@catedral.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold/30"
                  placeholder="••••••••"
                />
              </div>

              {erro && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3">
                  {erro}
                </div>
              )}

              <div className="pt-2">
                <Button type="submit" disabled={loading} className="w-full" variant="primary">
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-gold" />
                  Segurança por autenticação Supabase
                </span>
                <span className="text-gray-400">IEQ • Redenção</span>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}
