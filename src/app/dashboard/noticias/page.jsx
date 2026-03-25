"use client";

import { useEffect, useMemo, useState } from "react";

const CATEGORIAS = [
  { value: "cultos", label: "Cultos" },
  { value: "ministerios", label: "Ministérios" },
];

function formatDateBR(iso) {
  try {
    return new Date(iso).toLocaleString("pt-BR");
  } catch {
    return "";
  }
}

function getAdminToken() {
  return localStorage.getItem("ADMIN_API_TOKEN") || "";
}

export default function DashboardNoticiasPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroPublicado, setFiltroPublicado] = useState(""); // "", "true", "false"

  const [lista, setLista] = useState([]);
  const [erro, setErro] = useState("");

  const [modo, setModo] = useState("create"); // create | edit
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    titulo: "",
    resumo: "",
    conteudo: "",
    imagem_url: "",
    categoria: "cultos",
    publicado: false,
  });

  useEffect(() => {
    setToken(getAdminToken());
  }, []);

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  async function carregar() {
    setErro("");
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (filtroCategoria) qs.set("categoria", filtroCategoria);
      if (filtroPublicado) qs.set("publicado", filtroPublicado);

      const res = await fetch(`/api/admin/noticias?${qs.toString()}`, { headers });
      const data = await res.json();

      if (!res.ok || !data.ok) throw new Error(data.error || "Falha ao carregar");
      setLista(data.data || []);
    } catch (e) {
      setErro(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filtroCategoria, filtroPublicado]);

  function resetForm() {
    setModo("create");
    setEditId(null);
    setForm({
      titulo: "",
      resumo: "",
      conteudo: "",
      imagem_url: "",
      categoria: "cultos",
      publicado: false,
    });
  }

  async function salvarToken() {
    localStorage.setItem("ADMIN_API_TOKEN", token);
    await carregar();
  }

  async function uploadImagem(file) {
    setErro("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload/noticias", {
        method: "POST",
        headers,
        body: fd,
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Falha no upload");

      setForm((p) => ({ ...p, imagem_url: data.url }));
    } catch (e) {
      setErro(String(e.message || e));
    } finally {
      setUploading(false);
    }
  }

  async function criar(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/noticias", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Falha ao criar");

      resetForm();
      await carregar();
    } catch (e) {
      setErro(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function atualizar(e) {
    e.preventDefault();
    if (!editId) return;
    setErro("");
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/noticias/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Falha ao atualizar");

      resetForm();
      await carregar();
    } catch (e) {
      setErro(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function editar(item) {
    setErro("");
    setModo("edit");
    setEditId(item.id);
    setForm({
      titulo: item.titulo || "",
      resumo: item.resumo || "",
      conteudo: item.conteudo || "",
      imagem_url: item.imagem_url || "",
      categoria: item.categoria || "cultos",
      publicado: Boolean(item.publicado),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function alternarPublicado(item) {
    setErro("");
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/noticias/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ publicado: !item.publicado }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Falha ao atualizar");
      await carregar();
    } catch (e) {
      setErro(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function remover(item) {
    const ok = confirm(`Excluir a notícia "${item.titulo}"?`);
    if (!ok) return;

    setErro("");
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/noticias/${item.id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Falha ao excluir");
      await carregar();
    } catch (e) {
      setErro(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>Painel: Notícias</h1>
      <p style={{ marginTop: 6, color: "#555" }}>
        Crie, edite, publique e organize as notícias da igreja.
      </p>

      {/* Token do painel (temporário) */}
      <section style={{ marginTop: 18, padding: 14, border: "1px solid #eee", borderRadius: 14 }}>
        <strong>Chave do Painel (ADMIN_API_TOKEN)</strong>
        <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Cole aqui o ADMIN_API_TOKEN"
            style={{ flex: 1, minWidth: 260, padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
          <button
            onClick={salvarToken}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
          >
            Salvar
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("ADMIN_API_TOKEN");
              setToken("");
              setLista([]);
            }}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
          >
            Limpar
          </button>
        </div>
        <small style={{ display: "block", marginTop: 8, color: "#777" }}>
          Depois a gente integra isso ao seu login de usuários, para o leigo não ver/colar nada.
        </small>
      </section>

      {/* Form */}
      <section style={{ marginTop: 18, padding: 18, border: "1px solid #eee", borderRadius: 14, background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 18, fontWeight: 900 }}>
            {modo === "create" ? "Nova notícia" : `Editando notícia #${editId}`}
          </h2>
          {modo === "edit" ? (
            <button
              onClick={resetForm}
              style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
            >
              Cancelar edição
            </button>
          ) : null}
        </div>

        <form onSubmit={modo === "create" ? criar : atualizar} style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <label style={{ fontWeight: 800 }}>Título</label>
            <input
              value={form.titulo}
              onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
              required
            />
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <label style={{ fontWeight: 800 }}>Resumo (aparece na Home)</label>
            <textarea
              value={form.resumo}
              onChange={(e) => setForm((p) => ({ ...p, resumo: e.target.value }))}
              rows={3}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <label style={{ fontWeight: 800 }}>Conteúdo</label>
            <textarea
              value={form.conteudo}
              onChange={(e) => setForm((p) => ({ ...p, conteudo: e.target.value }))}
              rows={8}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
            <small style={{ color: "#777" }}>
              Dica: você pode colar texto com quebras de linha. O detalhe renderiza parágrafos.
            </small>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 800 }}>Categoria</label>
              <select
                value={form.categoria}
                onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))}
                style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
              >
                {CATEGORIAS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* IMAGEM com upload */}
            <div style={{ display: "grid", gap: 8 }}>
              <label style={{ fontWeight: 800 }}>Imagem</label>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input
                  value={form.imagem_url}
                  onChange={(e) => setForm((p) => ({ ...p, imagem_url: e.target.value }))}
                  placeholder="https://..."
                  style={{
                    flex: 1,
                    minWidth: 240,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid #ddd",
                  }}
                />

                <label
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    cursor: token && !uploading ? "pointer" : "not-allowed",
                    background: token && !uploading ? "#fff" : "#f3f4f6",
                    fontWeight: 800,
                  }}
                  title={!token ? "Cole o token do painel primeiro" : "Enviar imagem"}
                >
                  {uploading ? "Enviando..." : "Upload"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    disabled={!token || uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadImagem(f);
                      e.target.value = "";
                    }}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {form.imagem_url ? (
                <div style={{ marginTop: 8 }}>
                  <img
                    src={form.imagem_url}
                    alt="Prévia"
                    style={{ maxWidth: 280, borderRadius: 12, border: "1px solid #eee" }}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
            <input
              type="checkbox"
              checked={form.publicado}
              onChange={(e) => setForm((p) => ({ ...p, publicado: e.target.checked }))}
            />
            <span style={{ fontWeight: 800 }}>Publicar agora</span>
          </label>

          <button
            type="submit"
            disabled={!token || loading}
            style={{
              marginTop: 6,
              padding: "12px 14px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              background: !token || loading ? "#ddd" : "#b91c1c",
              color: !token || loading ? "#555" : "#fff",
              fontWeight: 900,
            }}
          >
            {modo === "create" ? "Salvar notícia" : "Atualizar notícia"}
          </button>
        </form>

        {erro ? (
          <div style={{ marginTop: 12, padding: 12, background: "#fee2e2", borderRadius: 12 }}>
            {erro}
          </div>
        ) : null}
      </section>

      {/* Filtros + Lista */}
      <section style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 18, fontWeight: 900 }}>Notícias cadastradas</h2>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            >
              <option value="">Todas categorias</option>
              <option value="cultos">Cultos</option>
              <option value="ministerios">Ministérios</option>
            </select>

            <select
              value={filtroPublicado}
              onChange={(e) => setFiltroPublicado(e.target.value)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            >
              <option value="">Publicadas e rascunhos</option>
              <option value="true">Somente publicadas</option>
              <option value="false">Somente rascunhos</option>
            </select>

            <button
              onClick={carregar}
              disabled={!token || loading}
              style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
            >
              Atualizar
            </button>
          </div>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {(lista || []).map((n) => (
            <div
              key={n.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 14,
                padding: 14,
                background: "white",
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: "#b91c1c", textTransform: "uppercase" }}>
                      {n.categoria || "geral"}
                    </span>
                    <span style={{ fontSize: 12, color: "#777" }}>{formatDateBR(n.criado_em)}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 900,
                        color: n.publicado ? "#166534" : "#92400e",
                      }}
                    >
                      {n.publicado ? "PUBLICADO" : "RASCUNHO"}
                    </span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 950, marginTop: 6 }}>{n.titulo}</div>
                  {n.resumo ? <div style={{ color: "#444", marginTop: 4 }}>{n.resumo}</div> : null}
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => editar(n)}
                    style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => alternarPublicado(n)}
                    style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
                  >
                    {n.publicado ? "Despublicar" : "Publicar"}
                  </button>
                  <button
                    onClick={() => remover(n)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      color: "#b91c1c",
                      fontWeight: 900,
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && token && (lista || []).length === 0 ? (
            <div style={{ padding: 14, borderRadius: 14, border: "1px solid #eee", background: "#fff" }}>
              Nenhuma notícia encontrada com esses filtros.
            </div>
          ) : null}

          {!token ? (
            <div style={{ padding: 14, borderRadius: 14, border: "1px solid #eee", background: "#fff" }}>
              Cole o <strong>ADMIN_API_TOKEN</strong> acima para habilitar o painel.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}