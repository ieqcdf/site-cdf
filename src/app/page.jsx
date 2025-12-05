import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-gray-800 flex flex-col">
      {/* HEADER / MENU */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo / Nome da igreja */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">
              Igreja do Evangelho Quadrangular
            </span>
            <span className="text-xs text-gray-500">
              Catedral da Família – Redenção / PA
            </span>
          </div>

          {/* Menu */}
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
              className="ml-4 rounded-full px-4 py-1.5 text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition"
            >
              Área dos Líderes
            </Link>
          </nav>

          {/* Versão simples do menu no mobile */}
          <div className="md:hidden">
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1">
        {/* HERO */}
        <section
          id="inicio"
          className="bg-gradient-to-b from-primary/10 via-slate-50 to-slate-50"
        >
          <div className="max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                Seja bem-vindo à Catedral da Família
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Um lugar de fé, família
                <span className="text-primary"> e propósito em Deus.</span>
              </h1>
              <p className="text-gray-600 mb-6 max-w-lg">
                Acompanhe nossos cultos, eventos e ministérios. Aqui você é
                acolhido, cuidado e desafiado a viver tudo aquilo que Deus
                sonhou para sua vida.
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
                  className="rounded-full px-6 py-2.5 text-sm font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition"
                >
                  Conhecer os ministérios
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-100 flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Próximos cultos & horários
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex justify-between">
                  <span>Culto de Celebração (Domingo)</span>
                  <span className="font-medium">19h30</span>
                </li>
                <li className="flex justify-between">
                  <span>Culto da Família (Quarta)</span>
                  <span className="font-medium">19h30</span>
                </li>
                <li className="flex justify-between">
                  <span>Reunião de Oração</span>
                  <span className="font-medium">Consultar agenda</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500">
                * Horários ilustrativos. Ajuste aqui depois com os horários
                oficiais da igreja.
              </p>
            </div>
          </div>
        </section>

        {/* SOBRE A IGREJA */}
        <section id="sobre" className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-[2fr,1.5fr] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Sobre a nossa igreja
              </h2>
              <p className="text-gray-700 mb-4">
                A Igreja do Evangelho Quadrangular em Redenção é uma comunidade
                cristã que crê em Jesus Cristo como Salvador, Batizador com o
                Espírito Santo, Médico dos médicos e Rei que há de vir. Nosso
                foco é alcançar vidas, cuidar de famílias e formar discípulos
                comprometidos com o Reino de Deus.
              </p>
              <p className="text-gray-700 mb-4">
                Aqui você vai encontrar um ambiente de comunhão, louvor, ensino
                da Palavra e serviço em diferentes ministérios, para todas as
                idades.
              </p>

              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Pregação bíblica e cristocêntrica</li>
                <li>• Acolhimento e cuidado com famílias</li>
                <li>• Ministérios específicos para cada fase da vida</li>
                <li>• Discipulado e formação de novos líderes</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
              <h3 className="text-lg font-semibold mb-3">
                Visite-nos em nossos cultos
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Endereço da igreja (ajuste depois):
              </p>
              <p className="text-sm text-gray-900 font-medium mb-4">
                Rua Exemplo, 123 – Bairro Tal, Redenção / PA
              </p>

              <p className="text-xs text-gray-500">
                Aqui você pode colocar um link para o Google Maps ou para a
                página de contato com mais detalhes.
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
                  Nossos ministérios
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Cada ministério serve com um propósito específico, mas todos
                  com o mesmo coração: glorificar a Jesus.
                </p>
              </div>
              <Link
                href="/ministerios"
                className="hidden md:inline-block text-sm text-primary hover:underline"
              >
                Ver detalhes dos ministérios
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 text-sm">
              {[
                "Ministério de Louvor",
                "Juventude",
                "Ministério Infantil",
                "Mulheres (cores)",
                "Homens",
                "Dança",
                "Diaconato & Recepção",
                "AME / MQM",
              ].map((nome) => (
                <div
                  key={nome}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition"
                >
                  <p className="font-semibold text-gray-900 mb-1">{nome}</p>
                  <p className="text-xs text-gray-600">
                    Em breve, esta área será conectada ao painel de líderes para
                    cada ministério.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRÓXIMOS EVENTOS (placeholder) */}
        <section id="eventos" className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Próximos eventos
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Esta seção em breve será carregada automaticamente do
                  Supabase.
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

        {/* CONTATO / LOCALIZAÇÃO */}
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
                Endereço, telefone e canais oficiais da igreja podem ser
                colocados aqui.
              </p>

              <ul className="text-sm space-y-2 text-slate-200">
                <li>📍 Rua Exemplo, 123 – Bairro Tal, Redenção / PA</li>
                <li>📞 (00) 00000-0000</li>
                <li>📧 contato@ieqcdf.com.br (ajuste depois)</li>
              </ul>
            </div>

            <div className="bg-slate-800/70 rounded-3xl border border-slate-700 p-6 flex flex-col gap-3">
              <h3 className="text-lg font-semibold">
                Fale com a secretaria da igreja
              </h3>
              <p className="text-sm text-slate-200">
                Aqui você pode colocar um link direto para o WhatsApp ou para a
                página de contato com formulário.
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
                Líderes de ministérios podem acessar o painel para publicar
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
            Desenvolvido por Habeck System · Em breve com painel completo para
            líderes.
          </span>
        </div>
      </footer>
    </main>
  );
}
