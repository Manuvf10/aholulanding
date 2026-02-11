import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "todoslosoficios | Marketplace de servicios locales",
  description: "Encuentra profesionales verificados cerca de ti por ubicación, precio y valoraciones.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ borderColor: "var(--border)", background: "rgba(255,250,244,.88)" }}>
          <Container className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="ui-badge">🛠️</span>
              <span className="text-lg font-semibold tracking-tight sm:text-xl">todoslosoficios</span>
            </Link>
            <nav className="hidden gap-2 md:flex">
              <Link href="/buscar" className="ui-button ui-button-secondary">Buscar</Link>
              <Link href="/categorias" className="ui-button ui-button-secondary">Categorías</Link>
              <Link href="/como-funciona" className="ui-button ui-button-secondary">Cómo funciona</Link>
              <Link href="/login" className="ui-button ui-button-primary">Entrar</Link>
            </nav>
            <Link href="/login" className="ui-button ui-button-primary md:hidden">Entrar</Link>
          </Container>
        </header>

        {children}

        <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}>
          <Container className="grid gap-8 py-10 sm:grid-cols-3">
            <div>
              <p className="ui-h3">todoslosoficios</p>
              <p className="ui-subtitle">Marketplace moderno para conectar clientes y profesionales locales.</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Producto</p>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <li><Link href="/buscar">Buscar</Link></li>
                <li><Link href="/categorias">Categorías</Link></li>
                <li><Link href="/como-funciona">Cómo funciona</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Legal y redes</p>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <li>Privacidad (placeholder)</li>
                <li>Términos (placeholder)</li>
                <li>X / LinkedIn / Instagram</li>
              </ul>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
