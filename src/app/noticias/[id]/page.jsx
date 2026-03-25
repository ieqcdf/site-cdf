import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function formatDateBR(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

export default async function NoticiaDetalhePage({ params }) {
  const { id } = params;

  const { data: n, error } = await supabase
    .from("noticias")
    .select("id, titulo, resumo, conteudo, imagem_url, categoria, criado_em, publicado")
    .eq("id", id)
    .maybeSingle();

  // se não achou ou não pode ler (RLS), mostra "não encontrada"
  if (error || !n || n.publicado !== true) {
    return (
      <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <Link href="/noticias" style={{ color: "#b91c1c", textDecoration: "none" }}>
          ← Voltar para notícias
        </Link>

        <div style={{ marginTop: 16, padding: 16, border: "1px solid #eee", borderRadius: 14 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Notícia não encontrada</h1>
          <p style={{ marginTop: 8, color: "#555" }}>
            Essa notícia não existe, foi removida ou ainda não foi publicada.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Link href="/noticias" style={{ color: "#b91c1c", textDecoration: "none" }}>
        ← Voltar para notícias
      </Link>

      <header style={{ marginTop: 18 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          <span style={{ fontSize: 12, color: "#b91c1c", fontWeight: 700, textTransform: "uppercase" }}>
            {n.categoria || "geral"}
          </span>
          <span style={{ fontSize: 12, color: "#777" }}>{formatDateBR(n.criado_em)}</span>
        </div>

        <h1 style={{ marginTop: 10, fontSize: 32, fontWeight: 900, lineHeight: 1.15 }}>
          {n.titulo}
        </h1>

        {n.resumo ? (
          <p style={{ marginTop: 10, fontSize: 16, color: "#444" }}>{n.resumo}</p>
        ) : null}
      </header>

      {n.imagem_url ? (
        <div style={{ marginTop: 18 }}>
          <img
            src={n.imagem_url}
            alt={n.titulo}
            style={{ width: "100%", borderRadius: 16, border: "1px solid #eee" }}
          />
        </div>
      ) : null}

      <article style={{ marginTop: 18, fontSize: 16, lineHeight: 1.75, color: "#222" }}>
        {/* conteúdo pode vir como texto simples */}
        {String(n.conteudo || "").split("\n").map((p, idx) =>
          p.trim() ? <p key={idx} style={{ marginTop: 10 }}>{p}</p> : null
        )}
      </article>
    </main>
  );
}