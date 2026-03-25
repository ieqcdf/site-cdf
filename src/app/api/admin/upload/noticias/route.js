import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function requireAdmin(req) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!process.env.ADMIN_API_TOKEN) return { ok: false, error: "ADMIN_API_TOKEN não configurado" };
  if (token !== process.env.ADMIN_API_TOKEN) return { ok: false, error: "Não autorizado" };
  return { ok: true };
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const guard = requireAdmin(req);
  if (!guard.ok) return NextResponse.json({ ok: false, error: guard.error }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ ok: false, error: "Arquivo não enviado." }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { ok: false, error: "Formato inválido. Use JPG, PNG ou WEBP." },
      { status: 400 }
    );
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const safeName = (file.name || `imagem.${ext}`).replace(/[^\w.\-]+/g, "_");
  const path = `noticia-${Date.now()}-${safeName}`;

  const { error: upErr } = await supabase.storage.from("noticias").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (upErr) {
    return NextResponse.json({ ok: false, error: upErr.message }, { status: 500 });
  }

  const { data: pub } = supabase.storage.from("noticias").getPublicUrl(path);

  return NextResponse.json({ ok: true, url: pub.publicUrl, path });
}