"use client";

import { useParams } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import MembrosForm from "@/components/MembrosForm";

export default function EditarMembroPage() {
  const { id } = useParams();

  return (
    <PrivateRoute>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">
          Editar membro {id ? `#${id}` : ""}
        </h1>
        <MembrosForm modo="editar" membroId={id} />
      </main>
    </PrivateRoute>
  );
}
