import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CHANNEL_ID = "UCBUnioC09aIVyYQ8Li1To3g";
const MAX_RESULTS = 2;
const REVALIDATE_SECONDS = 300;

function getApiKey() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY não configurada.");
  }

  return apiKey;
}

async function fetchJson(url, errorMessage) {
  const response = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(
      details ? `${errorMessage} Detalhes: ${details}` : errorMessage
    );
  }

  return response.json();
}

async function getUploadsPlaylistId(apiKey) {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("id", CHANNEL_ID);
  url.searchParams.set("key", apiKey);

  const json = await fetchJson(
    url,
    "Não foi possível obter os dados do canal no YouTube."
  );

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
  url.searchParams.set("maxResults", String(MAX_RESULTS));
  url.searchParams.set("key", apiKey);

  const json = await fetchJson(
    url,
    "Não foi possível obter os vídeos do canal."
  );

  const videos =
    json?.items?.map((item) => ({
      id: item?.contentDetails?.videoId || "",
      title: item?.snippet?.title || "Vídeo",
      description: item?.snippet?.description || "",
      publishedAt:
        item?.contentDetails?.videoPublishedAt ||
        item?.snippet?.publishedAt ||
        "",
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
    const apiKey = getApiKey();
    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey);
    const videos = await getLatestVideos(apiKey, uploadsPlaylistId);

    return NextResponse.json(
      {
        ok: true,
        channelId: CHANNEL_ID,
        videos,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar vídeos do YouTube.",
      },
      {
        status: 500,
      }
    );
  }
}