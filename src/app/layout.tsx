import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OficiosYa | Marketplace local",
  description: "Conecta con profesionales locales por ciudad o código postal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b bg-white">
          <div className="container-custom flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold text-blue-700">OficiosYa</Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/buscar">Buscar</Link>
              <Link href="/categorias">Categorías</Link>
              <Link href="/como-funciona">Cómo funciona</Link>
              <Link href="/login" className="btn-secondary">Login</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
