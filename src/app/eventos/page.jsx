"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import PrivateRoute from "@/components/PrivateRoute";

export default function Page() {
  return (
    <PrivateRoute>
      <EventosAdmin />
    </PrivateRoute>
  );
}

function EventosAdmin() {
  const router = useRouter();
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [confirmando, setConfirmando] = useState(null);

  // 🔹 Buscar eventos
  const buscarEventos = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .order("data_evento", { ascending: true });

    if (error) {
      console.error("Erro ao buscar eventos:", error);
    } else {
      setEventos(data);
    }

    setCarregando(false);
  };

  useEffect(() => {
    buscarEventos();
  }, []);

  // 🔹 Excluir evento
  const excluirEvento = async (id) => {
    try {
      console.log("Tentando excluir evento ID:", id);

      // Buscar imagem antes de excluir
      const { data: evento, error: buscaError } = await supabase
        .from("eventos")
        .select("imagem_url")
        .eq("id", id)
        .single();

      if (buscaError) throw buscaError;

      // Remover imagem se existir
      if (evento?.imagem_url) {
        const caminho = evento.imagem_url.split("/uploads/")[1];
        if (caminho) {
          const { error: storageError } = await supabase.storage
            .from("uploads")
            .remove([caminho]);
          if (storageError)
            console.warn("Erro ao remover imagem:", storageError);
        }
      }

      // Excluir registro do banco
      const { error: deleteError } = await supabase
        .from("eventos")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      alert("✅ Evento excluído com sucesso!");
      buscarEventos(); // atualiza a lista
    } catch (err) {
      console.error("Erro ao excluir evento:", err);
      alert("❌ Erro ao excluir evento. Verifique o console.");
    } finally {
      setConfirmando(null);
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando eventos...</p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto mt-10 p-4 relative">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Gerenciar Eventos
      </h1>

      {eventos.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum evento cadastrado ainda.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {evento.imagem_url && (
                <img
                  src={evento.imagem_url}
                  alt={evento.titulo}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {evento.titulo}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {evento.descricao || "Sem descrição"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  📅 {new Date(evento.data_evento).toLocaleDateString("pt-BR")}
                  {evento.horario && ` • 🕒 ${evento.horario}`}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/eventos/editar/${evento.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      console.log("Clicou em excluir:", evento.id);
                      setConfirmando(evento.id);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Modal de confirmação */}
      {confirmando && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4">
              Deseja realmente excluir este evento?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => excluirEvento(confirmando)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Sim
              </button>
              <button
                onClick={() => setConfirmando(null)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
