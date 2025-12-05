import Link from "next/link";

export default function MembrosPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar Membros</h1>
          <p className="text-sm text-gray-600">
            Em breve esta página terá a listagem de membros com filtros e
            detalhes.
          </p>
        </div>

        <Link
          href="/membros/cadastrar"
          className="rounded-full px-4 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition"
        >
          Cadastrar novo membro
        </Link>
      </header>

      <section className="border border-dashed border-gray-300 rounded-2xl p-6 text-sm text-gray-500">
        <p>
          Área de listagem de membros ainda em desenvolvimento. Quando
          finalizarmos a integração com o Supabase, os membros cadastrados
          aparecerão aqui.
        </p>
      </section>
    </main>
  );
}

