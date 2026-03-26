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

export async function GET(req) {
  const guard = requireAdmin(req);
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.error },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const url = new URL(req.url);
    const categoria = url.searchParams.get("categoria");
    const publicado = url.searchParams.get("publicado");

    let q = supabase
      .from("noticias")
      .select(
        "id, titulo, resumo, conteudo, imagem_url, categoria, publicado, criado_em"
      )
      .order("criado_em", { ascending: false })
      .limit(200);

    if (categoria) q = q.eq("categoria", categoria);
    if (publicado === "true") q = q.eq("publicado", true);
    if (publicado === "false") q = q.eq("publicado", false);

    const { data, error } = await q;

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

export async function POST(req) {
  const guard = requireAdmin(req);
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.error },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json().catch(() => ({}));

    const payload = {
      titulo: String(body.titulo || "").trim(),
      resumo: String(body.resumo || "").trim(),
      conteudo: String(body.conteudo || "").trim(),
      imagem_url: body.imagem_url ? String(body.imagem_url).trim() : null,
      categoria: body.categoria ? String(body.categoria).trim() : "cultos",
      publicado: Boolean(body.publicado),
    };

    if (!payload.titulo) {
      return NextResponse.json(
        { ok: false, error: "Título é obrigatório." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("noticias")
      .insert([payload])
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}