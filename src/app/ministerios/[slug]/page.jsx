import { notFound } from "next/navigation";

const ministeriosMock = [
  {
    slug: "louvor",
    nome: "Ministério de Louvor",
    descricao: "Adoração que toca o céu e conduz a igreja à presença de Deus.",
    playlistId: "PLxxxx",
  },
  {
    slug: "jovens",
    nome: "Ministério de Jovens",
    descricao: "Uma geração apaixonada por Jesus e comprometida com o Reino.",
    playlistId: "PLxxxx",
  },
  {
    slug: "infantil",
    nome: "Ministério Infantil",
    descricao: "Cuidando das crianças com amor, ensino bíblico e alegria.",
    playlistId: "PLxxxx",
  },
  {
    slug: "mulheres",
    nome: "Ministério de Mulheres",
    descricao: "Crescendo juntas em fé, comunhão e propósito.",
    playlistId: "PLxxxx",
  },
  {
    slug: "homens",
    nome: "Ministério de Homens",
    descricao: "Homens firmados em Cristo, fortalecendo suas famílias e sua fé.",
    playlistId: "PLxxxx",
  },
  {
    slug: "danca",
    nome: "Ministério de Dança",
    descricao: "Expressando adoração com arte, sensibilidade e entrega ao Senhor.",
    playlistId: "PLxxxx",
  },
  {
    slug: "diaconato",
    nome: "Diaconato",
    descricao: "Servindo com excelência, amor e cuidado no corpo de Cristo.",
    playlistId: "PLxxxx",
  },
  {
    slug: "ame",
    nome: "AME",
    descricao: "Um ministério dedicado ao cuidado, apoio e edificação.",
    playlistId: "PLxxxx",
  },
  {
    slug: "mqm",
    nome: "MQM",
    descricao: "Fortalecendo vidas por meio de comunhão, fé e serviço.",
    playlistId: "PLxxxx",
  },
  {
    slug: "esperanca",
    nome: "Esperança",
    descricao: "Levando consolo, fé e esperança por meio da Palavra de Deus.",
    playlistId: "PLxxxx",
  },
];

async function getVideos(playlistId) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    const url = new URL(
      "https://www.googleapis.com/youtube/v3/playlistItems"
    );

    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", "6");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    return (
      data.items?.map((item) => ({
        id: item.contentDetails.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.high?.url,
      })) || []
    );
  } catch {
    return [];
  }
}

export default async function MinisterioPage({ params }) {
  const ministerio = ministeriosMock.find(
    (m) => m.slug === params.slug
  );

  if (!ministerio) return notFound();

  const videos = await getVideos(ministerio.playlistId);

  return (
    <main className="min-h-screen bg-white px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{ministerio.nome}</h1>
      <p className="text-gray-600 mb-10">{ministerio.descricao}</p>

      {/* VIDEOS */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Últimos vídeos</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {videos.length > 0 ? (
            videos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                className="block"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-lg mb-2"
                />
                <p className="text-sm font-medium">{video.title}</p>
              </a>
            ))
          ) : (
            <p className="text-gray-500">
              Nenhum vídeo disponível ainda.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}