"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }) });
    if (!res.ok) return setError("Credenciales inválidas. Revisa email y contraseña.");
    const data = await res.json();
    router.push(data.role === "PROFESIONAL" ? "/dashboard/profesional" : "/dashboard/cliente");
  }

  return (
    <main className="ui-section">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border lg:grid-cols-2" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <section className="hidden p-8 lg:block" style={{ background: "linear-gradient(155deg,#f5e7d9,#fdf6ef)" }}>
            <h1 className="ui-h2">Accede a tu cuenta</h1>
            <p className="ui-subtitle">Gestiona solicitudes y presupuestos en una experiencia premium.</p>
          </section>

          <Card className="border-0 shadow-none">
            <h2 className="ui-h3">Iniciar sesión</h2>
            <form className="mt-4 space-y-3" onSubmit={onSubmit}>
              <div><label className="text-sm font-medium">Email</label><Input icon="✉️" name="email" required /></div>
              <div><label className="text-sm font-medium">Contraseña</label><Input icon="🔒" type="password" name="password" required /></div>
              {error && <Alert tone="error">{error}</Alert>}
              <button className="ui-button ui-button-primary w-full" type="submit">Entrar</button>
              <div className="grid gap-2 sm:grid-cols-2">
                <button type="button" className="ui-button ui-button-secondary">Google (placeholder)</button>
                <button type="button" className="ui-button ui-button-secondary">Apple (placeholder)</button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </main>
  );
}
