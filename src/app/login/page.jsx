"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setMensagem("❌ Usuário ou senha incorretos");
    } else {
      setMensagem("✅ Login efetuado com sucesso!");
      router.push("/dashboard");
    }

    setCarregando(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          Login
        </h1>

        <label className="block mb-2 font-semibold">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-4"
        />

        <label className="block mb-2 font-semibold">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-6"
        />

        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        {mensagem && (
          <p className="text-center text-sm mt-4 text-gray-600">{mensagem}</p>
        )}
      </form>
    </div>
  );
}
