import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "todoslosoficios | Marketplace de servicios locales",
  description: "Encuentra profesionales verificados cerca de ti por ubicación, precio y valoraciones.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="sticky top-0 z-40 border-b border-[var(--border)]/80 bg-[var(--surface)]/90 backdrop-blur">
          <div className="container-custom flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-[var(--primary-strong)] sm:text-xl">
              todoslosoficios
            </Link>

            <nav className="hidden items-center gap-2 text-sm sm:flex">
              <Link href="/buscar" className="btn-secondary">Buscar</Link>
              <Link href="/categorias" className="btn-secondary">Categorías</Link>
              <Link href="/como-funciona" className="btn-secondary">Cómo funciona</Link>
              <Link href="/login" className="btn-primary">Entrar</Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
