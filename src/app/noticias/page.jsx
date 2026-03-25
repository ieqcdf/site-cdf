import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function formatDateBR(iso) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR");
  } catch {
    return "";
  }
}

export default async function NoticiasPage() {
  const { data: noticias, error } = await supabase
    .from("noticias")
    .select("id, titulo, resumo, categoria, criado_em")
    .eq("publicado", true)
    .order("criado_em", { ascending: false })
    .limit(50);

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 30, fontWeight: 900 }}>Notícias</h1>
      <p style={{ marginTop: 8, color: "#555" }}>
        Acompanhe os acontecimentos da Catedral da Família.
      </p>

      {error ? (
        <div style={{ marginTop: 16, padding: 12, background: "#fee2e2", borderRadius: 12 }}>
          Erro ao carregar notícias: {error.message}
        </div>
      ) : null}

      <div style={{ marginTop: 22, display: "grid", gap: 14 }}>
        {(noticias || []).map((n) => (
          <Link
            key={n.id}
            href={`/noticias/${n.id}`}
            style={{
              display: "block",
              padding: 16,
              border: "1px solid #eee",
              borderRadius: 14,
              textDecoration: "none",
              color: "inherit",
              background: "white",
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
              <span style={{ fontSize: 12, color: "#b91c1c", fontWeight: 800, textTransform: "uppercase" }}>
                {n.categoria || "geral"}
              </span>
              <span style={{ fontSize: 12, color: "#777" }}>{formatDateBR(n.criado_em)}</span>
            </div>

            <h2 style={{ marginTop: 8, fontSize: 18, fontWeight: 900 }}>{n.titulo}</h2>
            {n.resumo ? <p style={{ marginTop: 8, color: "#444" }}>{n.resumo}</p> : null}
          </Link>
        ))}
      </div>
    </main>
  );
}