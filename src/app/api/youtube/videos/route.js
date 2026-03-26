import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CHANNEL_ID = "UCBUnioC09aIVyYQ8Li1To3g";

async function getUploadsPlaylistId(apiKey) {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("id", CHANNEL_ID);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Não foi possível obter os dados do canal no YouTube.");
  }

  const json = await res.json();
  const playlistId =
    json?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!playlistId) {
    throw new Error("Playlist de uploads do canal não encontrada.");
  }

  return playlistId;
}

async function getLatestVideos(apiKey, playlistId) {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", "2");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Não foi possível obter os vídeos do canal.");
  }

  const json = await res.json();

  const videos =
    json?.items?.map((item) => ({
      id: item?.contentDetails?.videoId,
      title: item?.snippet?.title || "Vídeo",
      description: item?.snippet?.description || "",
      publishedAt: item?.contentDetails?.videoPublishedAt || item?.snippet?.publishedAt,
      thumbnail:
        item?.snippet?.thumbnails?.high?.url ||
        item?.snippet?.thumbnails?.medium?.url ||
        item?.snippet?.thumbnails?.default?.url ||
        "",
    })) || [];

  return videos.filter((video) => video.id);
}

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "YOUTUBE_API_KEY não configurada." },
        { status: 500 }
      );
    }

    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey);
    const videos = await getLatestVideos(apiKey, uploadsPlaylistId);

    return NextResponse.json({ ok: true, videos });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message || "Erro ao buscar vídeos do YouTube." },
      { status: 500 }
    );
  }
}