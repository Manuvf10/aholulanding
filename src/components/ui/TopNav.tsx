"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "./utils";

type UserRole = "CLIENTE" | "PROFESIONAL";

interface TopNavProps {
  user: { name: string; role: UserRole } | null;
  homeHref: string;
}

const navItems = [
  { href: "/buscar", label: "Buscar" },
  { href: "/categorias", label: "Categorías" },
  { href: "/como-funciona", label: "Cómo funciona" },
];

export function TopNav({ user, homeHref }: TopNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (user) {
    return (
      <div className="container-custom flex items-center justify-between py-3">
        <Link href={homeHref} className="flex items-center gap-2" aria-label="Ir a panel">
          <span className="ui-logo-dot" aria-hidden>◈</span>
          <span className="text-lg font-semibold tracking-tight sm:text-xl">todoslosoficios</span>
        </Link>
        <button className="ui-button ui-button-danger" onClick={logout} aria-label="Cerrar sesión">Cerrar sesión</button>
      </div>
    );
  }

  return (
    <>
      <div className="container-custom flex items-center justify-between py-3">
        <Link href={homeHref} className="flex items-center gap-2" aria-label="Ir a inicio">
          <span className="ui-logo-dot" aria-hidden>◈</span>
          <span className="text-lg font-semibold tracking-tight sm:text-xl">todoslosoficios</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("ui-nav-link", pathname === item.href && "ui-nav-link-active")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/registro" className="ui-button ui-button-secondary">Registro</Link>
          <Link href="/login" className="ui-button ui-button-primary">Iniciar sesión</Link>
        </div>

        <button
          type="button"
          className="ui-button ui-button-ghost md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="ui-mobile-drawer md:hidden" role="dialog" aria-modal="true" aria-label="Menú móvil">
          <div className="container-custom py-4">
            <div className="ui-card space-y-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="ui-nav-link" onClick={() => setOpen(false)}>{item.label}</Link>
              ))}
              <hr style={{ borderColor: "var(--border)" }} />
              <div className="grid gap-2">
                <Link href="/login" className="ui-button ui-button-primary" onClick={() => setOpen(false)}>Iniciar sesión</Link>
                <Link href="/registro" className="ui-button ui-button-secondary" onClick={() => setOpen(false)}>Registro</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
