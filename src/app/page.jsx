"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Igreja do Evangelho Quadrangular – Redenção
      </h1>
      <p className="text-gray-600 max-w-xl mb-6">
        Seja bem-vindo ao nosso site! Acompanhe nossos cultos, eventos e
        ministérios. Junte-se a nós e viva o propósito de Deus para sua vida.
      </p>

      <Link
        href="/noticias"
        className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Ir para o mural de notícias
      </Link>
    </main>
  );
}
