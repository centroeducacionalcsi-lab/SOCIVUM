import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata = {
  title: "SOCIVUM",
  description: "Plataforma de Gestão para Organizações do Terceiro Setor"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
