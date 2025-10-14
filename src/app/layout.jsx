export const metadata = {
  title: "Igreja Quadrangular - Redenção",
  description: "Site oficial da Igreja Quadrangular de Redenção",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-text">
        {children}
      </body>
    </html>
  );
}
