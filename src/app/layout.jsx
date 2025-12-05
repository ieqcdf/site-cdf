import "./globals.css"; // garante que os estilos globais estão carregados
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Igreja Quadrangular - Redenção",
  description: "Site oficial da Igreja Quadrangular de Redenção",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="min-h-screen bg-slate-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
