import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-gray-800 flex flex-col">
      {/* HEADER / MENU */}
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo + nome */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src="/logo-quadrangular.png"
                alt="Logomarca Igreja do Evangelho Quadrangular"
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
                Catedral da Família – Redenção / PA
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
            <a href="#eventos" className="hover:text-primary transition">
              Eventos
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

          {/* Botão login mobile */}
          <div className="md:hidden">
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Faixa com as 4 cores quadrangulares */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-quadrangular-red" />
          <div className="flex-1 bg-quadrangular-yellow" />
          <div className="flex-1 bg-quadrangular-blue" />
          <div className="flex-1 bg-quadrangular-purple" />
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="flex-1">
        {/* HERO */}
        <section
          id="inicio"
          className="bg-gradient-to-b from-quadrangular-yellow/10 via-slate-50 to-slate-50"
        >
          <div className="max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-[0.2em]">
                Bem-vindo à Catedral da Família
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Um lugar de fé,{" "}
                <span className="text-primary">família e restauração</span> em
                Cristo.
              </h1>
              <p className="text-gray-700 mb-6 max-w-lg">
                Acompanhe nossos cultos, eventos e ministérios. Aqui você é
                acolhido, cuidado e desafiado a viver o propósito de Deus para
                sua vida.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/eventos"
                  className="rounded-full px-6 py-2.5 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
                >
                  Ver programação de cultos
                </Link>
                <a
                  href="#ministerios"
                  className="rounded-full px-6 py-2.5 text-sm font-semibold border border-primary/40 text-primary hover:bg-primary/5 transition"
                >
                  Conhecer os ministérios
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
                * Horários ilustrativos. Atualize aqui com os horários oficiais
                da igreja.
              </p>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-[2fr,1.5fr] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Sobre a Igreja do Evangelho Quadrangular
              </h2>
              <p className="text-gray-700 mb-4">
                Cremos em Jesus Cristo como Salvador, Batizador com o Espírito
                Santo, Médico dos médicos e Rei que há de vir. Como Catedral da
                Família em Redenção, nosso foco é alcançar vidas, cuidar de
                famílias e formar discípulos comprometidos com o Reino de Deus.
              </p>
              <p className="text-gray-700 mb-4">
                Nossos cultos são marcados por louvor, Palavra, oração e um
                ambiente acolhedor para todas as idades.
              </p>

              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Pregação bíblica e cristocêntrica</li>
                <li>• Acolhimento e cuidado com famílias</li>
                <li>• Ministérios para crianças, jovens, adultos e idosos</li>
                <li>• Formação e envio de novos líderes</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
              <h3 className="text-lg font-semibold mb-3">
                Venha participar conosco
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Endereço (ajuste depois com o endereço oficial):
              </p>
              <p className="text-sm text-gray-900 font-semibold mb-4">
                Rua Exemplo, 123 – Bairro Tal, Redenção / PA
              </p>
              <p className="text-xs text-gray-500">
                Aqui você pode colocar um link para o Google Maps ou página de
                contato.
              </p>
            </div>
          </div>
        </section>

        {/* MINISTÉRIOS */}
        <section id="ministerios" className="py-12 md:py-16 bg-white border-y">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Ministérios da Catedral da Família
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Cada ministério expressa uma parte do coração de Deus para a
                  igreja e para a cidade.
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
                  className={`rounded-2xl p-4 border border-slate-100 bg-slate-50 hover:shadow-sm transition`}
                >
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-2 ${m.cor}`}
                  >
                    {m.nome}
                  </span>
                  <p className="text-xs text-gray-600">
                    Em breve, esta área será alimentada pelos próprios líderes
                    de cada ministério.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTOS (placeholder) */}
        <section id="eventos" className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Próximos eventos
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Em breve, esta seção será carregada automaticamente do
                  Supabase com os eventos da igreja.
                </p>
              </div>
              <Link
                href="/eventos"
                className="hidden md:inline-block text-sm text-primary hover:underline"
              >
                Ver agenda completa
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <article
                  key={i}
                  className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm"
                >
                  <p className="text-xs text-gray-500 mb-1">
                    Data exemplo – ajuste depois
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Evento especial {i}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Descrição ilustrativa do evento. Em breve isso virá do
                    banco de dados.
                  </p>
                  <span className="inline-flex text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    Presencial
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO */}
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
                Fale com a secretaria da igreja ou faça-nos uma visita.
              </p>

              <ul className="text-sm space-y-2 text-slate-200">
                <li>📍 Rua Exemplo, 123 – Bairro Tal, Redenção / PA</li>
                <li>📞 (00) 00000-0000</li>
                <li>📧 contato@ieqcdf.com.br</li>
              </ul>
            </div>

            <div className="bg-slate-800/70 rounded-3xl border border-slate-700 p-6 flex flex-col gap-3">
              <h3 className="text-lg font-semibold">
                Fale com a secretaria da igreja
              </h3>
              <p className="text-sm text-slate-200">
                Aqui você pode colocar um link direto para o WhatsApp oficial
                da igreja ou um formulário de contato.
              </p>
              <Link
                href="/contato"
                className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition"
              >
                Ir para a página de contato
              </Link>
            </div>
          </div>
        </section>

        {/* ÁREA DOS LÍDERES */}
        <section
          id="lideres"
          className="py-10 bg-white border-t border-slate-100"
        >
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-1">
                Área exclusiva para líderes
              </h2>
              <p className="text-sm text-gray-600 max-w-xl">
                Líderes de ministérios acessam aqui o painel para publicar
                eventos, avisos e conteúdos específicos do seu ministério.
              </p>
            </div>

            <Link
              href="/login"
              className="rounded-full px-6 py-2.5 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition shadow-sm"
            >
              Entrar na área de líderes
            </Link>
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
