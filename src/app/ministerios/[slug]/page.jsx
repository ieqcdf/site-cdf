import { notFound } from "next/navigation";
import Image from "next/image";

const ministeriosMock = [
  {
    slug: "louvor",
    nome: "Ministério de Louvor",
    descricao: "Adoração que toca o céu e conduz a igreja à presença de Deus.",
    playlistId: "PLunSMgn9HE83QIL-RAz_qPdxpDKqC9fTY",
    cor: "from-red-50 to-white",
    destaque: "Adoração, excelência e sensibilidade à presença de Deus.",
    logo: "/logos/louvor.png",
  },
  {
    slug: "jovens",
    nome: "Ministério de Jovens",
    descricao: "Uma geração apaixonada por Jesus e comprometida com o Reino.",
    playlistId: "PLunSMgn9HE83l4Yi5vSOqNTV0-QEsq9xw",
    cor: "from-blue-50 to-white",
    destaque: "Uma juventude viva, relevante e apaixonada por Cristo.",
    logo: "/logos/jovens.png",
  },
  {
    slug: "infantil",
    nome: "Ministério Infantil",
    descricao: "Cuidando das crianças com amor, ensino bíblico e alegria.",
    playlistId: "PLunSMgn9HE82ZGI17BRt8dhX_NZhrQxHK",
    cor: "from-yellow-50 to-white",
    destaque: "Semeando o Reino de Deus no coração das crianças.",
    logo: "/logos/infantil.png",
  },
  {
    slug: "mulheres",
    nome: "Ministério de Mulheres",
    descricao: "Crescendo juntas em fé, comunhão e propósito.",
    playlistId: "PLunSMgn9HE81QWbvN8rGk8543BjPjBjXA",
    cor: "from-purple-50 to-white",
    destaque: "Mulheres fortalecidas pela fé, comunhão e propósito.",
    logo: "/logos/mulheres.png",
  },
  {
    slug: "homens",
    nome: "Ministério de Homens",
    descricao: "Homens firmados em Cristo, fortalecendo suas famílias e sua fé.",
    playlistId: "PLunSMgn9HE820qxqrui6DxWOE_6yOrwX9",
    cor: "from-slate-100 to-white",
    destaque: "Homens de fé, compromisso e liderança cristã.",
    logo: "/logos/homens.png",
  },
  {
    slug: "danca",
    nome: "Ministério de Dança",
    descricao: "Expressando adoração com arte, sensibilidade e entrega ao Senhor.",
    playlistId: "PLunSMgn9HE80jfy8a2GlbseJy6jgnyFdB",
    cor: "from-pink-50 to-white",
    destaque: "Arte e movimento como expressão de adoração ao Senhor.",
    logo: "/logos/danca.png",
  },
  {
    slug: "diaconato",
    nome: "Diaconato",
    descricao: "Servindo com excelência, amor e cuidado no corpo de Cristo.",
    playlistId: "PLunSMgn9HE81fHwhaBItegFUcgGp_J_4h",
    cor: "from-amber-50 to-white",
    destaque: "Serviço, organização e cuidado com a casa de Deus.",
    logo: "/logos/diaconato.png",
  },
  {
    slug: "ame",
    nome: "AME",
    descricao: "Um ministério dedicado ao cuidado, apoio e edificação.",
    playlistId: "PLunSMgn9HE82C_aovj7vK5GvUUSoWyQRN",
    cor: "from-emerald-50 to-white",
    destaque: "Ações de amor, apoio e edificação para alcançar vidas.",
    logo: "/logos/ame.png",
  },
  {
    slug: "mqm",
    nome: "MQM",
    descricao: "Fortalecendo vidas por meio de comunhão, fé e serviço.",
    playlistId: "PLunSMgn9HE81cgbp-mwtIWBlaOlnHzPB0",
    cor: "from-indigo-50 to-white",
    destaque: "Comunhão, fé e serviço para fortalecer vidas e famílias.",
    logo: "/logos/mqm.png",
  },
  {
    slug: "esperanca",
    nome: "Esperança",
    descricao: "Levando consolo, fé e esperança por meio da Palavra de Deus.",
    playlistId: "PLunSMgn9HE82qdgtFsmRYfi6v_DoiA_Uh",
    cor: "from-orange-50 to-white",
    destaque: "Levando esperança e consolo por meio da Palavra.",
    logo: "/logos/esperanca.png",
  },
];

async function getVideos(playlistId) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
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
        id: item?.contentDetails?.videoId,
        title: item?.snippet?.title || "Vídeo",
        thumbnail:
          item?.snippet?.thumbnails?.high?.url ||
          item?.snippet?.thumbnails?.medium?.url ||
          item?.snippet?.thumbnails?.default?.url ||
          "",
        publishedAt:
          item?.contentDetails?.videoPublishedAt || item?.snippet?.publishedAt || "",
      })) || []
    );
  } catch {
    return [];
  }
}

function formatDateBR(dateString) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("pt-BR");
  } catch {
    return "";
  }
}

export default async function MinisterioPage({ params }) {
  const ministerio = ministeriosMock.find((m) => m.slug === params.slug);

  if (!ministerio) return notFound();

  const videos = await getVideos(ministerio.playlistId);
  const videoPrincipal = videos[0] || null;
  const videosSecundarios = videos.slice(1);

  return (
    <main className="min-h-screen bg-brand-paper">
      {/* HERO DO MINISTÉRIO */}
      <section className={`bg-gradient-to-b ${ministerio.cor} border-b border-brand-line`}>
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-14 md:pt-12 md:pb-16">
          <div className="relative overflow-hidden rounded-[32px] border border-brand-line bg-white shadow-soft">
            {/* faixa/banner */}
            <div className="h-36 md:h-44 bg-gradient-to-r from-brand-red via-brand-gold to-brand-red opacity-95" />

            {/* brilho suave */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-36 md:h-44 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_35%)]" />

            {/* conteúdo */}
            <div className="relative px-6 md:px-10 pb-8">
              <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-14 md:-mt-16">
                {/* logo */}
                <div className="relative h-28 w-28 md:h-36 md:w-36 shrink-0 rounded-3xl border border-white/60 bg-white shadow-lg p-3">
                  {ministerio.logo ? (
                    <Image
                      src={ministerio.logo}
                      alt={ministerio.nome}
                      fill
                      className="object-contain p-3"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                      Logo
                    </div>
                  )}
                </div>

                {/* textos */}
                <div className="flex-1 pt-2 md:pt-0">
                  <p className="text-xs font-semibold text-brand-red uppercase tracking-[0.22em] mb-2">
                    Página do ministério
                  </p>

                  <h1 className="text-3xl md:text-5xl font-extrabold text-brand-ink mb-3">
                    {ministerio.nome}
                  </h1>

                  <p className="text-base md:text-lg text-gray-700 max-w-3xl mb-4">
                    {ministerio.descricao}
                  </p>

                  <div className="inline-flex rounded-full bg-brand-gold/10 border border-brand-gold/30 px-4 py-2 text-sm text-brand-ink">
                    {ministerio.destaque}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">
        {/* SEÇÃO NOTÍCIAS */}
        <section>
          <div className="mb-6">
            <p className="text-xs font-semibold text-brand-red uppercase tracking-[0.22em] mb-2">
              Notícias
            </p>
            <h2 className="text-3xl font-bold text-brand-ink mb-2">
              Conteúdos e avisos do ministério
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Aqui ficarão os avisos, imagens, vídeos e textos publicados pelo
              portal do administrador. Essa área já está preparada para receber
              os conteúdos oficiais de cada ministério.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-3xl border border-brand-line bg-white p-6 shadow-soft">
              <div className="h-44 rounded-2xl bg-gradient-to-br from-brand-red/10 to-brand-gold/10 border border-brand-line mb-4 flex items-center justify-center text-sm text-gray-500">
                Espaço para imagem
              </div>
              <p className="text-xs font-semibold text-brand-red uppercase tracking-[0.18em] mb-2">
                Em breve
              </p>
              <h3 className="text-lg font-semibold text-brand-ink mb-2">
                Notícias do ministério
              </h3>
              <p className="text-sm text-gray-600">
                Os líderes poderão publicar avisos, ações, registros e
                conteúdos para a igreja acompanhar.
              </p>
            </article>

            <article className="rounded-3xl border border-brand-line bg-white p-6 shadow-soft">
              <div className="h-44 rounded-2xl bg-gradient-to-br from-brand-gold/10 to-brand-red/10 border border-brand-line mb-4 flex items-center justify-center text-sm text-gray-500">
                Espaço para vídeo
              </div>
              <p className="text-xs font-semibold text-brand-red uppercase tracking-[0.18em] mb-2">
                Planejado
              </p>
              <h3 className="text-lg font-semibold text-brand-ink mb-2">
                Posts com mídia
              </h3>
              <p className="text-sm text-gray-600">
                Cada publicação poderá conter texto, imagem ou vídeo, conforme
                a necessidade do ministério.
              </p>
            </article>

            <article className="rounded-3xl border border-brand-line bg-white p-6 shadow-soft">
              <div className="h-44 rounded-2xl bg-gradient-to-br from-brand-red/10 to-brand-gold/10 border border-brand-line mb-4 flex items-center justify-center text-sm text-gray-500">
                Espaço para texto
              </div>
              <p className="text-xs font-semibold text-brand-red uppercase tracking-[0.18em] mb-2">
                Próxima etapa
              </p>
              <h3 className="text-lg font-semibold text-brand-ink mb-2">
                Gestão por líderes
              </h3>
              <p className="text-sm text-gray-600">
                Os responsáveis por cada ministério terão acesso individual
                para alimentar essa área com segurança.
              </p>
            </article>
          </div>
        </section>

        {/* SEÇÃO YOUTUBE */}
        <section>
          <div className="mb-6">
            <p className="text-xs font-semibold text-brand-red uppercase tracking-[0.22em] mb-2">
              YouTube
            </p>
            <h2 className="text-3xl font-bold text-brand-ink mb-2">
              Vídeos do ministério
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Esta seção é sincronizada automaticamente com a playlist oficial
              do ministério no YouTube.
            </p>
          </div>

          {videoPrincipal ? (
            <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr] items-start mb-10">
              <div className="rounded-3xl border border-brand-line bg-white p-4 md:p-5 shadow-soft">
                <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoPrincipal.id}`}
                    title={videoPrincipal.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold text-brand-red uppercase tracking-[0.18em] mb-2">
                  Vídeo em destaque
                </p>

                <h3 className="text-2xl font-bold text-brand-ink mb-3">
                  {videoPrincipal.title}
                </h3>

                <p className="text-sm text-gray-500 mb-5">
                  {formatDateBR(videoPrincipal.publishedAt)}
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Conteúdo mais recente publicado pelo ministério. Os próximos
                  vídeos aparecem abaixo em ordem automática de atualização.
                </p>

                <a
                  href={`https://www.youtube.com/watch?v=${videoPrincipal.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-red text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-red/90 transition"
                >
                  Assistir no YouTube
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-brand-line bg-white p-10 text-center text-gray-500 shadow-soft">
              Nenhum vídeo disponível ainda.
            </div>
          )}

          {videosSecundarios.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {videosSecundarios.map((video) => (
                <article
                  key={video.id}
                  className="rounded-3xl border border-brand-line bg-white p-4 shadow-soft hover:-translate-y-1 transition"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-4">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                          Sem thumbnail
                        </div>
                      )}
                    </div>

                    <h4 className="font-semibold text-brand-ink mb-2 line-clamp-2">
                      {video.title}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {formatDateBR(video.publishedAt)}
                    </p>
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}