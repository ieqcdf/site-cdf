import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function requireAdmin(req) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!process.env.ADMIN_API_TOKEN) {
    return { ok: false, error: "ADMIN_API_TOKEN não configurado" };
  }

  if (token !== process.env.ADMIN_API_TOKEN) {
    return { ok: false, error: "Não autorizado" };
  }

  return { ok: true };
}

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL não configurado");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não configurado");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

export async function GET(req, { params }) {
  const guard = requireAdmin(req);
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.error },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const id = params.id;

    const { data, error } = await supabase
      .from("noticias")
      .select(
        "id, titulo, resumo, conteudo, imagem_url, categoria, publicado, criado_em"
      )
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const guard = requireAdmin(req);
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.error },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const id = params.id;
    const body = await req.json().catch(() => ({}));

    const payload = {};

    if ("titulo" in body) payload.titulo = String(body.titulo || "").trim();
    if ("resumo" in body) payload.resumo = String(body.resumo || "").trim();
    if ("conteudo" in body) payload.conteudo = String(body.conteudo || "").trim();
    if ("imagem_url" in body) {
      payload.imagem_url = body.imagem_url
        ? String(body.imagem_url).trim()
        : null;
    }
    if ("categoria" in body) {
      payload.categoria = body.categoria
        ? String(body.categoria).trim()
        : "cultos";
    }
    if ("publicado" in body) payload.publicado = Boolean(body.publicado);

    if (Object.keys(payload).length === 0) {
      return NextResponse.json(
        { ok: false, error: "Nada para atualizar." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("noticias")
      .update(payload)
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const guard = requireAdmin(req);
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.error },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const id = params.id;

    const { error } = await supabase.from("noticias").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}