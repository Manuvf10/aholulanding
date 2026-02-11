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
        <header className="sticky top-0 z-50 border-b border-[var(--border)]/85 bg-[var(--surface)]/85 backdrop-blur-md">
          <div className="container-custom flex items-center justify-between py-4">
            <Link href="/" className="group flex items-center gap-2">
              <span className="rounded-xl bg-[var(--primary-soft)] px-2 py-1 text-sm">🛠️</span>
              <span className="text-lg font-bold tracking-tight text-[var(--primary-strong)] sm:text-xl">
                todoslosoficios
              </span>
            </Link>

            <nav className="hidden items-center gap-2 text-sm md:flex">
              <Link href="/buscar" className="btn-secondary">Buscar</Link>
              <Link href="/categorias" className="btn-secondary">Categorías</Link>
              <Link href="/como-funciona" className="btn-secondary">Cómo funciona</Link>
              <Link href="/login" className="btn-primary">Entrar</Link>
            </nav>

            <Link href="/login" className="btn-primary md:hidden">Entrar</Link>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
