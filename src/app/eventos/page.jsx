"use client";

import { useEffect, useState } from "react";
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
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [confirmando, setConfirmando] = useState(null); // guarda o id do evento que o usuário quer excluir

  // 🔹 Buscar eventos
  const buscarEventos = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .order("data_evento", { ascending: true });

    if (error) console.error(error);
    else setEventos(data);

    setCarregando(false);
  };

  useEffect(() => {
    buscarEventos();
  }, []);

  // 🔹 Excluir evento
  const excluirEvento = async (id) => {
    const { error } = await supabase.from("eventos").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("Erro ao excluir o evento.");
    } else {
      alert("Evento excluído com sucesso!");
      buscarEventos(); // atualiza a listagem
    }
    setConfirmando(null);
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando eventos...</p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto mt-10 p-4">
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
                    onClick={() =>
                      window.location.assign(`/eventos/editar/${evento.id}`)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => setConfirmando(evento.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
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
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Sim
              </button>
              <button
                onClick={() => setConfirmando(null)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
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
