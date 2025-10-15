"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ListaEventos() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarEventos() {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("data_evento", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setEventos(data);
      }
      setCarregando(false);
    }

    buscarEventos();
  }, []);

  if (carregando) {
    return <p className="text-center mt-8">Carregando eventos...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Eventos da Igreja
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
                <p className="text-sm text-gray-500">
                  📅 {new Date(evento.data_evento).toLocaleDateString("pt-BR")}
                  {evento.horario && ` • 🕒 ${evento.horario}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
