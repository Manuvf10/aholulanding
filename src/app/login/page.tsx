"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }) });
    if (!res.ok) {
      setError("Credenciales inválidas");
      return;
    }
    const data = await res.json();
    router.push(data.role === "PROFESIONAL" ? "/dashboard/profesional" : "/dashboard/cliente");
  }

  return (
    <main className="container-custom py-12">
      <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="badge">Acceso a tu panel</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Bienvenido a todoslosoficios</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">Gestiona tus solicitudes, presupuesto y perfil desde una experiencia simple y profesional.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="kpi"><p className="text-xs text-[var(--muted)]">Cliente demo</p><p className="font-semibold">cliente@demo.com</p></div>
            <div className="kpi"><p className="text-xs text-[var(--muted)]">Profesional demo</p><p className="font-semibold">pro@demo.com</p></div>
          </div>
        </div>

        <form className="card" onSubmit={onSubmit}>
          <h2 className="text-xl font-semibold">Iniciar sesión</h2>
          <label className="label mt-4" htmlFor="email">Email</label>
          <div className="input-wrapper"><span className="input-icon">✉️</span><input className="input input-with-icon" id="email" name="email" required /></div>
          <label className="label mt-3" htmlFor="password">Contraseña</label>
          <div className="input-wrapper"><span className="input-icon">🔒</span><input className="input input-with-icon" id="password" type="password" name="password" required /></div>
          {error && <p className="mt-3 text-sm text-[var(--danger)]">{error}</p>}
          <button className="btn-primary mt-5 w-full" type="submit">Entrar</button>
          <p className="mt-4 text-xs text-[var(--muted)]">Demo: cliente@demo.com / 123456 | pro@demo.com / 123456</p>
        </form>
      </div>
    </main>
  );
}
