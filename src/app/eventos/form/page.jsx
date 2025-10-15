"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EventosForm() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [horario, setHorario] = useState("");
  const [imagem, setImagem] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      let imagem_url = null;

      // 🔹 Upload da imagem para o Storage
      if (imagem) {
        const nomeArquivo = `eventos/${Date.now()}-${imagem.name}`;
        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(nomeArquivo, imagem);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("uploads")
          .getPublicUrl(nomeArquivo);

        imagem_url = data.publicUrl;
      }

      // 🔹 Inserção dos dados na tabela eventos
      const { error: insertError } = await supabase.from("eventos").insert([
        {
          titulo,
          descricao,
          data_evento: dataEvento,
          horario,
          imagem_url,
        },
      ]);

      if (insertError) throw insertError;

      setMensagem("✅ Evento cadastrado com sucesso!");
      setTitulo("");
      setDescricao("");
      setDataEvento("");
      setHorario("");
      setImagem(null);
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao cadastrar evento.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
      <h1 className="text-2xl font-bold text-primary mb-4">Cadastrar Evento</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border p-2 rounded-md"
          ></textarea>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-semibold">Data</label>
            <input
              type="date"
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold">Horário</label>
            <input
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Imagem</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files[0])}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {carregando ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      {mensagem && <p className="mt-4 text-center">{mensagem}</p>}
    </div>
  );
}