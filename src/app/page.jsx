import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-paper text-gray-900 flex flex-col">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50">
        <div className="bg-white/80 backdrop-blur-md border-b border-brand-gold/25">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            
            {/* Logo + Nome */}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 md:h-12 md:w-12">
                <Image
                  src="/logo-catedral.png"
                  alt="Catedral da Família"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="leading-tight">
                <p className="text-xs font-semibold tracking-[0.18em] text-brand-ink uppercase">
                  Igreja do Evangelho Quadrangular
                </p>
                <p className="text-[11px] text-brand-muted">
                  Catedral da Família · Redenção / PA
                </p>
              </div>
            </div>

            {/* Menu */}
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

            {/* Mobile */}
            <div className="md:hidden">
              <Button href="/login" variant="gold">
                Login
              </Button>
            </div>
          </div>

          {/* Linha dourada sutil */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />

          {/* Faixa quadrangular discreta */}
          <div className="h-[3px] w-full flex">
            <div className="flex-1 bg-quadrangular-red" />
            <div className="flex-1 bg-quadrangular-yellow" />
            <div className="flex-1 bg-quadrangular-blue" />
            <div className="flex-1 bg-quadrangular-purple" />
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section id="inicio" className="bg-gradient-to-b from-brand-gold/10 to-brand-paper">
        <div className="max-w-6xl mx-auto px-4 py-20 grid gap-12 md:grid-cols-2 items-center">
          
          <div>
            <p className="text-xs font-semibold text-brand-red mb-2 uppercase tracking-[0.25em]">
              Bem-vindo à Catedral da Família
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Um lugar para{" "}
              <span className="text-brand-red">
                pertencer, crer e crescer
              </span>{" "}
              em Jesus.
            </h1>

            <p className="text-gray-700 mb-8 max-w-lg">
              Somos uma igreja para toda a família, comprometida em pregar o
              Evangelho Quadrangular e viver o amor de Cristo em Redenção.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="#agenda">
                Junte-se a nós neste domingo
              </Button>

              <Button variant="outline" href="#online">
                Assistir online
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-soft p-8 border border-brand-line">
            <h2 className="text-xl font-semibold mb-4 text-brand-ink">
              Próximos cultos
            </h2>

            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Culto de Celebração</span>
                <span className="font-semibold text-brand-red">Domingo · 19h30</span>
              </li>
              <li className="flex justify-between">
                <span>Culto da Família</span>
                <span className="font-semibold text-brand-red">Quarta · 19h30</span>
              </li>
              <li className="flex justify-between">
                <span>Reunião de Oração</span>
                <span className="font-semibold text-brand-red">
                  Consulte a agenda
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MINISTÉRIOS ================= */}
      <section id="ministerios" className="py-20 bg-white border-y border-brand-line">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Ministérios da Catedral da Família
            </h2>
            <p className="text-gray-600">
              Cada ministério expressa uma parte do coração de Deus para a igreja.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4 text-sm">
            {[
              "Louvor",
              "Juventude",
              "Ministério Infantil",
              "Mulheres",
              "Homens",
              "Dança",
              "Diaconato",
              "AME / MQM",
            ].map((nome) => (
              <div
                key={nome}
                className="bg-brand-paper border border-brand-line rounded-2xl p-5 hover:shadow-soft transition"
              >
                <h3 className="font-semibold mb-2 text-brand-ink">{nome}</h3>
                <p className="text-gray-600 text-xs">
                  Em breve cada ministério terá sua própria página.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ONLINE ================= */}
      <section id="online" className="py-20 bg-brand-paper">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Assista aos cultos online
            </h2>
            <p className="text-gray-700 mb-6">
              Quando não puder estar presencialmente, acompanhe nossas mensagens
              e transmissões ao vivo.
            </p>

            <Button variant="primary" href="#">
              Ir para o canal oficial
            </Button>
          </div>

          <div className="aspect-video bg-slate-200 rounded-3xl flex items-center justify-center text-gray-500 text-sm">
            Área para player de vídeo
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-brand-line">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-brand-muted gap-2">
          <span>
            © {new Date().getFullYear()} Igreja do Evangelho Quadrangular – Redenção
          </span>
          <span>Desenvolvido por Habeck System</span>
        </div>
      </footer>
    </main>
  );
}
