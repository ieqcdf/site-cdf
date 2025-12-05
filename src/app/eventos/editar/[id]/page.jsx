"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import PrivateRoute from "@/components/PrivateRoute";

export default function Page({ params }) {
  return (
    <PrivateRoute>
      <EditarEvento id={params.id} />
    </PrivateRoute>
  );
}

function EditarEvento({ id }) {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [horario, setHorario] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemAtual, setImagemAtual] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);

  // 🔹 Carregar dados do evento
  useEffect(() => {
    async function carregarEvento() {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setMensagem("❌ Erro ao carregar evento.");
      } else {
        setTitulo(data.titulo);
        setDescricao(data.descricao || "");
        setDataEvento(data.data_evento || "");
        setHorario(data.horario || "");
        setImagemAtual(data.imagem_url || "");
      }
      setCarregando(false);
    }

    carregarEvento();
  }, [id]);

  // 🔹 Atualizar evento
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      let imagem_url = imagemAtual;

      // Se o usuário escolheu uma nova imagem:
      if (imagem) {
        const nomeLimpo = imagem.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9._-]/g, "");

        const nomeArquivo = `eventos/${Date.now()}-${nomeLimpo}`;

        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(nomeArquivo, imagem);

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("uploads")
          .getPublicUrl(nomeArquivo);

        imagem_url = publicData.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("eventos")
        .update({
          titulo,
          descricao,
          data_evento: dataEvento,
          horario,
          imagem_url,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      setMensagem("✅ Evento atualizado com sucesso!");
      setTimeout(() => router.push("/eventos"), 1500);
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao atualizar evento.");
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando evento...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
      <h1 className="text-2xl font-bold text-primary mb-4">Editar Evento</h1>

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

        {imagemAtual && (
          <div>
            <label className="block font-semibold mb-1">Imagem Atual</label>
            <img
              src={imagemAtual}
              alt="Imagem atual"
              className="w-full h-48 object-cover rounded-md mb-2"
            />
          </div>
        )}

        <div>
          <label className="block font-semibold">Nova Imagem (opcional)</label>
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
          {carregando ? "Salvando..." : "Salvar Alterações"}
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

