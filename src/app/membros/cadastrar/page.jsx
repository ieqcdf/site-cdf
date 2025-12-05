"use client";

import PrivateRoute from "@/components/PrivateRoute";
import MembrosForm from "@/components/MembrosForm";

export default function Page() {
  return (
    <PrivateRoute>
      <MembrosForm />
    </PrivateRoute>
  );
}
