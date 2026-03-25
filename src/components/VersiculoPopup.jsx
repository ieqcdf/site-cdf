"use client";

import { useEffect, useState } from "react";

export default function VersiculoPopup() {
  const [versiculo, setVersiculo] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function carregarVersiculo() {
      try {
        const res = await fetch("/api/versiculo-do-dia");
        const data = await res.json();

        const hoje = new Date().toISOString().slice(0, 10);
        const vistoHoje = localStorage.getItem("versiculo_visto");

        if (vistoHoje !== hoje && data.popup_ativo) {
          setVersiculo(data);
          setShow(true);
          localStorage.setItem("versiculo_visto", hoje);
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