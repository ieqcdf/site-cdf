"use client";

import { useEffect, useState } from "react";

export default function VersiculoPopup() {
  const [versiculo, setVersiculo] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function carregarVersiculo() {
      try {
        const jaViu = sessionStorage.getItem("versiculo_visto");

        // 👇 se já viu nessa aba, não mostra de novo
        if (jaViu) return;

        const res = await fetch("/api/versiculo-do-dia", {
          cache: "no-store",
        });
        const data = await res.json();

        if (data?.ok && data.popup_ativo) {
          setVersiculo(data);
          setShow(true);

          // 👇 marca que já exibiu nessa sessão
          sessionStorage.setItem("versiculo_visto", "true");
        }
      } catch (err) {
        console.error("Erro ao carregar versículo:", err);
      }
    }

    carregarVersiculo();
  }, []);

  if (!show || !versiculo) return null;

  return (
    <div style={overlay}>
      <div style={popup}>
        <h3>{versiculo.popup_titulo}</h3>
        <p style={{ fontStyle: "italic" }}>{versiculo.texto}</p>
        <strong>{versiculo.referencia}</strong>

        <button onClick={() => setShow(false)} style={botao}>
          Fechar
        </button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const popup = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "500px",
  textAlign: "center",
};

const botao = {
  marginTop: "20px",
  padding: "10px 20px",
  border: "none",
  background: "#b91c1c",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};