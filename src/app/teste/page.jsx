"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Teste() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("pg_tables").select("*");
      if (error) console.error(error);
      else setData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Conexão Supabase</h1>
      {data ? <p>✅ Conexão OK!</p> : <p>Carregando...</p>}
    </div>
  );
}
