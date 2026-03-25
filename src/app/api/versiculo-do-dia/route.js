// src/app/api/versiculo-do-dia/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function todayISO() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function defaultVerse() {
  return {
    referencia: "Salmos 23:1",
    texto: "O Senhor é o meu pastor; nada me faltará.",
    versao: "nvi",
    fonte: "fallback_padrao",
  };
}

function extractVerseFromAbibliaDigital(payload) {
  // formato retornado pela ABíbliaDigital:
  // { book: { name }, chapter, number, text, ... }
  const referencia = `${payload.book?.name} ${payload.chapter}:${payload.number}`;
  const texto = payload.text;
  return { referencia, texto, versao: "nvi", fonte: "abibliadigital" };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchRandomVersePT() {
  const url = "https://www.abibliadigital.com.br/api/verses/nvi/random";

  // Token é opcional. Se você tiver, coloque em ABIBLIA_DIGITAL_TOKEN.
  const headers = process.env.ABIBLIA_DIGITAL_TOKEN
    ? { Authorization: `Bearer ${process.env.ABIBLIA_DIGITAL_TOKEN}` }
    : {};

  let lastText = "";
  let lastStatus = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers, cache: "no-store" });
    lastStatus = res.status;

    if (res.ok) return res.json();

    try {
      lastText = await res.text();
    } catch {}

    // backoff simples
    await sleep(400 * attempt);
  }

  throw new Error(`ABibliaDigital indisponível. HTTP ${lastStatus}. body=${lastText}`);
}

async function getSiteConfig() {
  const { data, error } = await supabase
    .from("site_config")
    .select("id, popup_versiculo_ativo, popup_titulo, versiculo_id")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) throw new Error(`Erro ao ler site_config: ${error.message}`);
  return data;
}

async function getVerseByDate(dateISO) {
  const { data, error } = await supabase
    .from("versiculos")
    .select("id, referencia, texto, data_versiculo")
    .eq("data_versiculo", dateISO)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`Erro ao ler versiculos do dia: ${error.message}`);
  return data;
}

async function getLastVerse() {
  const { data, error } = await supabase
    .from("versiculos")
    .select("id, referencia, texto, data_versiculo")
    .order("data_versiculo", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`Erro ao ler último versiculo: ${error.message}`);
  return data;
}

async function setConfigVersePointer(configId, verseId) {
  const { error } = await supabase
    .from("site_config")
    .update({ versiculo_id: verseId })
    .eq("id", configId);

  if (error) throw new Error(`Erro ao atualizar site_config.versiculo_id: ${error.message}`);
}

async function insertVerseOfDay({ referencia, texto, versao, fonte, data_versiculo }) {
  const { data, error } = await supabase
    .from("versiculos")
    .insert([
      {
        referencia,
        texto,
        versao,
        fonte,
        data_versiculo,
      },
    ])
    .select("id, referencia, texto, data_versiculo")
    .single();

  // Se tiver unique(data_versiculo) e alguém já inseriu, pode cair aqui.
  if (error) return { data: null, error };
  return { data, error: null };
}

export async function GET() {
  try {
    const hoje = todayISO();
    const cfg = await getSiteConfig();

    // 1) Se já existe versículo de hoje no histórico, devolve
    const vHoje = await getVerseByDate(hoje);
    if (vHoje?.id) {
      if (cfg.versiculo_id !== vHoje.id) {
        await setConfigVersePointer(cfg.id, vHoje.id);
      }
      return NextResponse.json({
        ok: true,
        fonte: "cache",
        popup_ativo: cfg.popup_versiculo_ativo,
        popup_titulo: cfg.popup_titulo,
        referencia: vHoje.referencia,
        texto: vHoje.texto,
        data: hoje,
      });
    }

    // 2) Se não existe, tenta buscar na ABíbliaDigital (com retry)
    try {
      const payload = await fetchRandomVersePT();
      const verse = extractVerseFromAbibliaDigital(payload);

      const { data: inserted, error: insErr } = await insertVerseOfDay({
        referencia: verse.referencia,
        texto: verse.texto,
        versao: verse.versao,
        fonte: verse.fonte,
        data_versiculo: hoje,
      });

      // Se deu conflito por UNIQUE(data_versiculo), busca de novo
      if (insErr) {
        const again = await getVerseByDate(hoje);
        if (again?.id) {
          await setConfigVersePointer(cfg.id, again.id);
          return NextResponse.json({
            ok: true,
            fonte: "cache_after_conflict",
            popup_ativo: cfg.popup_versiculo_ativo,
            popup_titulo: cfg.popup_titulo,
            referencia: again.referencia,
            texto: again.texto,
            data: hoje,
          });
        }

        // Se não conseguiu recuperar, cai no fallback histórico
        throw new Error(insErr.message);
      }

      await setConfigVersePointer(cfg.id, inserted.id);

      return NextResponse.json({
        ok: true,
        fonte: "api",
        popup_ativo: cfg.popup_versiculo_ativo,
        popup_titulo: cfg.popup_titulo,
        referencia: inserted.referencia,
        texto: inserted.texto,
        data: hoje,
      });
    } catch (apiErr) {
      // 3) Fallback: pega o último versículo do histórico
      const last = await getLastVerse();
      if (last?.id) {
        await setConfigVersePointer(cfg.id, last.id);
        return NextResponse.json({
          ok: true,
          fonte: "fallback_historico",
          popup_ativo: cfg.popup_versiculo_ativo,
          popup_titulo: cfg.popup_titulo,
          referencia: last.referencia,
          texto: last.texto,
          data: hoje,
          warning: `API externa indisponível: ${String(apiErr?.message || apiErr)}`,
        });
      }

      // 4) Último fallback: versículo padrão
      const dv = defaultVerse();
      return NextResponse.json({
        ok: true,
        fonte: "fallback_padrao",
        popup_ativo: cfg.popup_versiculo_ativo,
        popup_titulo: cfg.popup_titulo,
        referencia: dv.referencia,
        texto: dv.texto,
        data: hoje,
        warning: `API externa indisponível e histórico vazio: ${String(apiErr?.message || apiErr)}`,
      });
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}