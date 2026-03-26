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
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "Arquivo não enviado." },
        { status: 400 }
      );
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Formato inválido. Use JPG, PNG ou WEBP." },
        { status: 400 }
      );
    }

    const ext =
      file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
        ? "webp"
        : "jpg";

    const safeName = (file.name || `imagem.${ext}`).replace(/[^\w.\-]+/g, "_");
    const path = `noticia-${Date.now()}-${safeName}`;

    const { error: upErr } = await supabase.storage
      .from("noticias")
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (upErr) {
      return NextResponse.json(
        { ok: false, error: upErr.message },
        { status: 500 }
      );
    }

    const { data: pub } = supabase.storage.from("noticias").getPublicUrl(path);

    return NextResponse.json({ ok: true, url: pub.publicUrl, path });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}