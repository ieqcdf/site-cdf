import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const ministerios = [
    "Louvor",
    "Juventude",
    "Ministério Infantil",
    "Mulheres",
    "Homens",
    "Dança",
    "Diaconato",
    "AME",
    "MQM",
    "Esperança",
  ];

  return (
    <main className="min-h-screen bg-brand-paper text-gray-900 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-gold/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-4">
            <a href="#inicio" className="flex items-center gap-3 min-w-0">
              <div className="relative h-11 w-11 md:h-12 md:w-12 shrink-0">
                <Image
                  src="/logo-catedral.png"
                  alt="Catedral da Família"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="leading-tight min-w-0">
                <p className="text-[11px] md:text-xs font-semibold tracking-[0.18em] text-brand-ink uppercase truncate">
                  Igreja do Evangelho Quadrangular
                </p>
                <p className="text-[11px] text-brand-muted truncate">
                  Catedral da Família · Redenção / PA
                </p>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-ink">
              <a href="#inicio" className="hover:text-brand-red transition">
                Início
              </a>
              <a href="#sobre" className="hover:text-brand-red transition">
                Sobre
              </a>
              <a href="#ministerios" className="hover:text-brand-red transition">
                Ministérios
              </a>
              <a href="#agenda" className="hover:text-brand-red transition">
                Agenda
              </a>
              <a href="#contato" className="hover:text-brand-red transition">
                Contato
              </a>

              <Button href="/login" variant="gold" className="ml-2">
                Área dos Líderes
              </Button>
            </nav>

            <div className="md:hidden">
              <Button href="/login" variant="gold">
                Login
              </Button>
            </div>
          </div>
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />
        <div className="h-[3px] w-full flex">
          <div className="flex-1 bg-quadrangular-red" />
          <div className="flex-1 bg-quadrangular-yellow" />
          <div className="flex-1 bg-quadrangular-blue" />
          <div className="flex-1 bg-quadrangular-purple" />
        </div>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="bg-gradient-to-b from-brand-gold/10 via-white to-brand-paper"
      >
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold text-brand-red mb-3 uppercase tracking-[0.25em]">
              Bem-vindo à Catedral da Família
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Um lugar para{" "}
              <span className="text-brand-red">pertencer, crer e crescer</span>{" "}
              em Jesus.
            </h1>

            <p className="text-gray-700 mb-8 max-w-xl text-base md:text-lg">
              Somos uma igreja para toda a família, comprometida em pregar o
              Evangelho Quadrangular e viver o amor de Cristo em Redenção.
              Você é muito bem-vindo aqui.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#agenda" variant="primary">
                Junte-se a nós neste domingo
              </Button>

              <Button href="#online" variant="outline">
                Assistir online
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8 border border-brand-line">
            <h2 className="text-xl font-semibold mb-5 text-brand-ink">
              Próximos cultos
            </h2>

            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-center justify-between gap-4">
                <span>Culto de Celebração</span>
                <span className="font-semibold text-brand-red">
                  Domingo · 19h30
                </span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span>Culto da Família</span>
                <span className="font-semibold text-brand-red">
                  Quarta · 19h30
                </span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span>Reunião de Oração</span>
                <span className="font-semibold text-brand-red">
                  Consulte a agenda
                </span>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 p-4 text-sm text-brand-ink">
              Um ambiente de fé, comunhão, louvor e Palavra para toda a família.
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
          <div>
            <p className="text-xs font-semibold text-brand-red mb-2 uppercase tracking-[0.22em]">
              Sobre nós
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Uma igreja centrada em Cristo e voltada para a família
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              A Catedral da Família em Redenção existe para anunciar Jesus
              Cristo, acolher pessoas, fortalecer lares e formar discípulos.
              Queremos ser uma igreja viva, bíblica, amorosa e relevante para a
              cidade.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Aqui você encontra comunhão, ensino da Palavra, oração, serviço e
              oportunidades para crescer em todas as fases da vida.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-line bg-brand-paper p-5">
              <h3 className="font-semibold mb-2 text-brand-ink">Missão</h3>
              <p className="text-sm text-gray-600">
                Alcançar vidas, discipular pessoas e servir famílias com amor e
                excelência.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-line bg-brand-paper p-5">
              <h3 className="font-semibold mb-2 text-brand-ink">Visão</h3>
              <p className="text-sm text-gray-600">
                Ser uma igreja acolhedora, madura e comprometida com o Reino de
                Deus.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-line bg-brand-paper p-5 sm:col-span-2">
              <h3 className="font-semibold mb-2 text-brand-ink">Valores</h3>
              <p className="text-sm text-gray-600">
                Fé, família, comunhão, serviço, santidade, discipulado e amor
                ao próximo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MINISTÉRIOS */}
      <section id="ministerios" className="py-16 bg-brand-paper border-y border-brand-line">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-brand-red mb-2 uppercase tracking-[0.22em]">
              Ministérios
            </p>
            <h2 className="text-3xl font-bold mb-3">
              Ministérios da Catedral da Família
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada ministério expressa uma parte do cuidado de Deus com a
              igreja. Sirva, cresça e caminhe conosco.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ministerios.map((nome) => (
              <div
                key={nome}
                className="rounded-2xl border border-brand-line bg-white p-5 hover:shadow-soft transition"
              >
                <h3 className="font-semibold text-brand-ink mb-2">{nome}</h3>
                <p className="text-sm text-gray-600">
                  Em breve, cada ministério terá sua própria área com conteúdos,
                  eventos e avisos.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE */}
      <section id="online" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold text-brand-red mb-2 uppercase tracking-[0.22em]">
              Cultos online
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Acompanhe também pela internet
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Quando não puder estar presencialmente, acompanhe nossas
              transmissões e mensagens online. Em breve, esta área será
              integrada com o canal oficial da igreja.
            </p>

            <Button href="#" variant="primary">
              Ir para o canal oficial
            </Button>
          </div>

          <div className="aspect-video rounded-3xl border border-brand-line bg-slate-100 flex items-center justify-center text-sm text-gray-500">
            Área para player de vídeo
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="py-16 bg-brand-paper border-y border-brand-line">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-brand-red mb-2 uppercase tracking-[0.22em]">
              Próximos passos
            </p>
            <h2 className="text-3xl font-bold mb-3">
              Caminhe conosco em cada etapa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Queremos te ajudar a crescer em fé, comunhão e serviço.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div className="rounded-2xl bg-white border border-brand-line p-5">
              <h3 className="font-semibold mb-2">Conhecer Jesus</h3>
              <p className="text-sm text-gray-600">
                Entenda o Evangelho e descubra o propósito de Deus para sua
                vida.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-brand-line p-5">
              <h3 className="font-semibold mb-2">Batismo</h3>
              <p className="text-sm text-gray-600">
                Saiba mais sobre o batismo nas águas e como se preparar.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-brand-line p-5">
              <h3 className="font-semibold mb-2">Células & Grupos</h3>
              <p className="text-sm text-gray-600">
                Conecte-se com pessoas e cresça em comunhão durante a semana.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-brand-line p-5">
              <h3 className="font-semibold mb-2">Servir</h3>
              <p className="text-sm text-gray-600">
                Descubra onde você pode servir com seus dons e talentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-16 bg-brand-night text-white">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
          <div>
            <p className="text-xs font-semibold text-brand-gold mb-2 uppercase tracking-[0.22em]">
              Contato
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Venha nos visitar ou fale com a nossa equipe
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              <li>📍 Rua Ademar Guimarães, 455 – Núcleo Urbano, Redenção / PA</li>
              <li>📞 (94) 99119-2038</li>
              <li>📧 ieq.cdf@gmail.com</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold mb-3">Área dos líderes</h3>
            <p className="text-sm text-white/75 mb-5">
              Líderes de ministérios acessam o painel para publicar eventos,
              avisos e conteúdos específicos.
            </p>
            <Button href="/login" variant="gold">
              Entrar na área de líderes
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-brand-line">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-brand-muted">
          <span>
            © {new Date().getFullYear()} Igreja do Evangelho Quadrangular - Catedral da Familia –
            Redenção. Todos os direitos reservados.
          </span>
          <span>Desenvolvido por Habeck System</span>
        </div>
      </footer>
    </main>
  );
}