import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Container } from "@/components/ui/Container";
import { TopNav } from "@/components/ui/TopNav";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "todoslosoficios | Marketplace de servicios locales",
  description: "Encuentra profesionales verificados cerca de ti por ubicación, precio y valoraciones.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  const homeHref = !user ? "/" : user.role === "PROFESIONAL" ? "/dashboard/profesional" : "/dashboard/cliente";

  return (
    <html lang="es">
      <body className="ui-page">
        <div className="ui-bg" aria-hidden />
        <header className="ui-top-nav-wrap">
          <TopNav user={user ? { name: user.name, role: user.role } : null} homeHref={homeHref} />
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
