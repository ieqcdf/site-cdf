"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NoticiasPage() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarEventos() {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("data_evento", { ascending: false })
        .limit(6);

      if (error) console.error("Erro ao buscar eventos:", error);
      else setEventos(data);

      setCarregando(false);
    }

    carregarEventos();
  }, []);

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Carregando notícias...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          🕊️ Mural de Notícias e Eventos
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
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {evento.imagem_url && (
                  <img
                    src={evento.imagem_url}
                    alt={evento.titulo}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-primary mb-1">
                    {evento.titulo}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {evento.descricao}
                  </p>
                  <p className="text-gray-500 text-sm">
                    📅 {new Date(evento.data_evento).toLocaleDateString("pt-BR")}
                    {evento.horario && ` • 🕒 ${evento.horario}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
