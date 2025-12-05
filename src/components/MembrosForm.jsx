"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MembrosForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ministerio, setMinisterio] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("Solteiro(a)");
  const [conjuge, setConjuge] = useState("");
  const [isCasado, setIsCasado] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  // ✅ lista simplificada sem divisão por cores
  const ministerios = [
    "Pastoral",
    "Diaconato",
    "Louvor",
    "Homens",
    "Mulheres",
    "Jovens",
    "Infantil",
    "Dança",
    "AME",
    "MQM",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      const { error } = await supabase.from("membros").insert([
        {
          nome,
          email,
          telefone,
          ministerio,
          data_nascimento: dataNascimento,
          estado_civil: estadoCivil,
          conjuge: isCasado ? conjuge : null,
        },
      ]);

      if (error) throw error;

      setMensagem("✅ Membro cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setTelefone("");
      setMinisterio("");
      setDataNascimento("");
      setEstadoCivil("Solteiro(a)");
      setConjuge("");
      setIsCasado(false);
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao cadastrar membro.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
      <h1 className="text-2xl font-bold text-primary mb-4">Cadastrar Membro</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nome completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Telefone</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(xx) xxxxx-xxxx"
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Ministério</label>
          <select
            value={ministerio}
            onChange={(e) => setMinisterio(e.target.value)}
            required
            className="w-full border p-2 rounded-md"
          >
            <option value="">Selecione...</option>
            {ministerios.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Data de nascimento</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCasado}
              onChange={(e) => {
                setIsCasado(e.target.checked);
                if (!e.target.checked) setConjuge("");
              }}
            />
            É casado(a)?
          </label>

          {isCasado && (
            <>
              <label className="block font-semibold mt-2">Nome do cônjuge</label>
              <input
                type="text"
                value={conjuge}
                onChange={(e) => setConjuge(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {carregando ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      {mensagem && (
        <p
          className={`mt-4 text-center ${
            mensagem.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensagem}
        </p>
      )}
    </div>
  );
}
