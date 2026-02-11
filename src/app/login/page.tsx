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
      <div className="mx-auto grid max-w-5xl items-center gap-6 md:grid-cols-2">
        <div>
          <p className="badge inline-block">Acceso seguro</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Bienvenido a todoslosoficios</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">Entra para gestionar solicitudes, presupuestos y tu perfil profesional.</p>
        </div>

        <form className="card" onSubmit={onSubmit}>
          <label className="label" htmlFor="email">Email</label>
          <input className="input" id="email" name="email" required />
          <label className="label mt-3" htmlFor="password">Contraseña</label>
          <input className="input" id="password" type="password" name="password" required />
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
          <button className="btn-primary mt-4 w-full" type="submit">Entrar</button>
          <p className="mt-4 text-xs text-[var(--muted)]">Demo: cliente@demo.com / 123456 | pro@demo.com / 123456</p>
        </form>
      </div>
    </main>
  );
}
