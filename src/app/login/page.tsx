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
    if (!res.ok) { setError("Credenciales inválidas"); return; }
    const data = await res.json();
    router.push(data.role === "PROFESIONAL" ? "/dashboard/profesional" : "/dashboard/cliente");
  }

  return (
    <main className="container-custom py-12">
      <h1 className="text-3xl font-bold">Iniciar sesión</h1>
      <form className="card mt-6 max-w-md" onSubmit={onSubmit}>
        <label className="label" htmlFor="email">Email</label>
        <input className="input" id="email" name="email" required />
        <label className="label mt-3" htmlFor="password">Contraseña</label>
        <input className="input" id="password" type="password" name="password" required />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button className="btn-primary mt-4 w-full" type="submit">Entrar</button>
        <p className="mt-3 text-sm">Demo: cliente@demo.com / 123456 | pro@demo.com / 123456</p>
      </form>
    </main>
  );
}
