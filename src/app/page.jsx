import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-gray-900 flex flex-col">
      {/* HEADER */}
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo + nome */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src="/logo-quadrangular.png" // ajuste o nome do arquivo se for outro
                alt="Igreja do Evangelho Quadrangular"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                Igreja do Evangelho Quadrangular
              </p>
              <p className="text-[11px] text-gray-500">
                Catedral da Família · Redenção / PA
              </p>
            </div>
          </div>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#inicio" className="hover:text-primary transition">
              Início
            </a>
            <a href="#sobre" className="hover:text-primary transition">
              Sobre
            </a>
            <a href="#ministerios" className="hover:text-primary transition">
              Ministérios
            </a>
            <a href="#agenda" className="hover:text-primary transition">
              Agenda
            </a>
            <a href="#contato" className="hover:text-primary transition">
              Contato
            </a>
            <Link
              href="/login"
              className="ml-4 rounded-full px-4 py-1.5 text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
            >
              Área dos Líderes
            </Link>
          </nav>

          {/* Mobile: só botão login */}
          <div className="md:hidden">
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Faixa com as 4 cores */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-quadrangular-red" />
          <div className="flex-1 bg-quadrangular-yellow" />
          <div className="flex-1 bg-quadrangular-blue" />
          <div className="flex-1 bg-quadrangular-purple" />
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="flex-1">
        {/* HERO / WELCOME HOME */}
        <section
          id="inicio"
          className="bg-gradient-to-b from-quadrangular-blue/10 via-slate-50 to-slate-50"
        >
          <div className="max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-[0.25em]">
                Bem-vindo à Catedral da Família
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                Um lugar para{" "}
                <span className="text-primary">pertencer, crer e crescer</span>{" "}
                em Jesus.
              </h1>
              <p className="text-gray-700 mb-6 max-w-lg">
                Somos uma igreja para toda a família, comprometida em pregar o
                Evangelho Quadrangular e viver o amor de Cristo em Redenção.
                Você é muito bem-vindo aqui.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#junte-se"
                  className="rounded-full px-6 py-2.5 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
                >
                  Junte-se a nós neste domingo
                </a>
                <a
                  href="#online"
                  className="rounded-full px-6 py-2.5 text-sm font-semibold border border-primary/40 text-primary hover:bg-primary/5 transition"
                >
                  Assistir online
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-100 flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Próximos cultos
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex justify-between">
                  <span>Culto de Celebração (Domingo)</span>
                  <span className="font-semibold text-primary">19h30</span>
                </li>
                <li className="flex justify-between">
                  <span>Culto da Família (Quarta)</span>
                  <span className="font-semibold text-primary">19h30</span>
                </li>
                <li className="flex justify-between">
                  <span>Reunião de Oração</span>
                  <span className="font-semibold text-primary">
                    Consulte a agenda
                  </span>
                </li>
              </ul>
              <p className="text-xs text-gray-500">
                * Ajuste os horários acima de acordo com a programação oficial
                da igreja.
              </p>
            </div>
          </div>
        </section>

        {/* JUNTE-SE A NÓS DOMINGO (tipo “Join Us Sunday”) */}
        <section
          id="junte-se"
          className="py-12 md:py-16 bg-white border-y border-slate-100"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Junte-se a nós neste fim de semana
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Nossos cultos são momentos de adoração, ensino bíblico e
                comunhão. Se você está começando na fé ou já caminha com Jesus
                há anos, há um lugar para você aqui.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Domingo</p>
                <h3 className="font-semibold mb-1">Culto de Celebração</h3>
                <p className="text-sm text-gray-700 mb-2">19h30</p>
                <p className="text-xs text-gray-600">
                  Louvor, Palavra e um tempo especial em família.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Quarta-feira</p>
                <h3 className="font-semibold mb-1">Culto da Família</h3>
                <p className="text-sm text-gray-700 mb-2">19h30</p>
                <p className="text-xs text-gray-600">
                  Encontros para fortalecer lares e relacionamentos.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Durante a semana</p>
                <h3 className="font-semibold mb-1">Células & Ministérios</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Horários variados
                </p>
                <p className="text-xs text-gray-600">
                  Pequenos grupos e encontros específicos de cada ministério.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MINISTÉRIOS */}
        <section id="ministerios" className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Ministérios para toda a família
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Sirva, cresça e se conecte em um dos nossos ministérios.
                </p>
              </div>
              <Link
                href="/ministerios"
                className="hidden md:inline-block text-sm text-primary hover:underline"
              >
                Ver todos os ministérios
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 text-sm">
              {[
                { nome: "Louvor", cor: "bg-quadrangular-red/10 text-quadrangular-red" },
                { nome: "Juventude", cor: "bg-quadrangular-blue/10 text-quadrangular-blue" },
                { nome: "Ministério Infantil", cor: "bg-quadrangular-yellow/10 text-quadrangular-yellow" },
                { nome: "Mulheres", cor: "bg-quadrangular-purple/10 text-quadrangular-purple" },
                { nome: "Homens", cor: "bg-quadrangular-red/10 text-quadrangular-red" },
                { nome: "Dança", cor: "bg-quadrangular-purple/10 text-quadrangular-purple" },
                { nome: "Diaconato & Recepção", cor: "bg-quadrangular-blue/10 text-quadrangular-blue" },
                { nome: "AME / MQM", cor: "bg-quadrangular-yellow/10 text-quadrangular-yellow" },
              ].map((m) => (
                <div
                  key={m.nome}
                  className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition"
                >
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-2 ${m.cor}`}
                  >
                    {m.nome}
                  </span>
                  <p className="text-xs text-gray-600">
                    Em breve, cada ministério terá uma página própria, atualizada
                    pelos líderes.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ASSISTIR ONLINE */}
        <section
          id="online"
          className="py-12 md:py-16 bg-white border-y border-slate-100"
        >
          <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Assista aos cultos online
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Quando não puder estar presencialmente, acompanhe nossos cultos
                e mensagens pela internet.
              </p>
              <p className="text-sm text-gray-700 mb-4">
                Em breve, esta área será integrada com o canal oficial da
                igreja no YouTube ou outra plataforma de transmissão.
              </p>

              <a
                href="#"
                className="inline-flex rounded-full px-6 py-2.5 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
              >
                Ir para o canal da igreja
              </a>
            </div>

            <div className="aspect-video bg-slate-200 rounded-3xl flex items-center justify-center text-xs text-gray-500">
              Área para player / embed de vídeo
            </div>
          </div>
        </section>

        {/* PRÓXIMOS PASSOS */}
        <section id="agenda" className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Próximos passos na sua caminhada
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Queremos caminhar com você em cada etapa: desde conhecer Jesus,
                até servir e liderar outras pessoas.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4 text-sm">
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h3 className="font-semibold mb-1">Conhecer Jesus</h3>
                <p className="text-xs text-gray-600">
                  Entenda o que significa seguir a Cristo e viver uma nova
                  vida.
                </p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h3 className="font-semibold mb-1">Batismo</h3>
                <p className="text-xs text-gray-600">
                  Saiba mais sobre o batismo nas águas e como se preparar.
                </p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h3 className="font-semibold mb-1">Células & Grupos</h3>
                <p className="text-xs text-gray-600">
                  Conecte-se em pequenos grupos e cresça em comunhão.
                </p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <h3 className="font-semibold mb-1">Servir</h3>
                <p className="text-xs text-gray-600">
                  Descubra onde você pode servir usando seus dons e talentos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO & LÍDERES */}
        <section
          id="contato"
          className="py-12 md:py-16 bg-slate-900 text-slate-100"
        >
          <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Localização & Contato
              </h2>
              <p className="text-sm text-slate-200 mb-3">
                Venha nos visitar ou fale com a nossa equipe.
              </p>

              <ul className="text-sm space-y-2 text-slate-200 mb-4">
                <li>📍 Rua Exemplo, 123 – Bairro Tal, Redenção / PA</li>
                <li>📞 (00) 00000-0000</li>
                <li>📧 contato@ieqcdf.com.br</li>
              </ul>
            </div>

            <div className="bg-slate-800/70 rounded-3xl border border-slate-700 p-6 flex flex-col gap-3">
              <h3 className="text-lg font-semibold">
                Área exclusiva para líderes
              </h3>
              <p className="text-sm text-slate-200">
                Líderes de ministérios acessam o painel para publicar eventos,
                avisos e conteúdos específicos.
              </p>
              <Link
                href="/login"
                className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition"
              >
                Entrar na área de líderes
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} Igreja do Evangelho Quadrangular –
            Redenção. Todos os direitos reservados.
          </span>
          <span className="text-[11px]">
            Desenvolvido por Habeck System · Painel para líderes em
            desenvolvimento.
          </span>
        </div>
      </footer>
    </main>
  );
}
