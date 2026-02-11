"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const initialRole = params.get("role") === "PROFESIONAL" ? "PROFESIONAL" : "CLIENTE";
  const [selectedRole, setSelectedRole] = useState<"CLIENTE" | "PROFESIONAL">(initialRole);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }) });
    if (!res.ok) {
      setLoading(false);
      return setError("Credenciales inválidas. Revisa email y contraseña.");
    }
    const data = await res.json();
    setLoading(false);
    router.push(data.role === "PROFESIONAL" ? "/dashboard/profesional" : "/dashboard/cliente");
  }

  return (
    <main className="ui-section">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border lg:grid-cols-2" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <section className="hidden p-8 lg:block" style={{ background: "linear-gradient(155deg,#f5e7d9,#fdf6ef)" }}>
            <h1 className="ui-h2">Inicia sesión según tu rol</h1>
            <p className="ui-subtitle">Cliente: encuentra y solicita. Profesional: responde y gestiona solicitudes.</p>
          </section>

          <Card className="border-0 shadow-none">
            <h2 className="ui-h3">Iniciar sesión</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border p-1" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
              <button type="button" className={`ui-button ${selectedRole === "CLIENTE" ? "ui-button-primary" : "ui-button-ghost"}`} onClick={() => setSelectedRole("CLIENTE")}>Cliente</button>
              <button type="button" className={`ui-button ${selectedRole === "PROFESIONAL" ? "ui-button-primary" : "ui-button-ghost"}`} onClick={() => setSelectedRole("PROFESIONAL")}>Profesional</button>
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>Entrando como: {selectedRole}</p>

            <form className="mt-4 space-y-3" onSubmit={onSubmit}>
              <div><label className="text-sm font-medium">Email</label><Input icon="✉️" name="email" required /></div>
              <div><label className="text-sm font-medium">Contraseña</label><Input icon="🔒" type="password" name="password" required /></div>
              {error && <Alert tone="error">{error}</Alert>}
              <button className="ui-button ui-button-primary w-full" type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
              <div className="grid gap-2 sm:grid-cols-2">
                <button type="button" className="ui-button ui-button-secondary">Google (placeholder)</button>
                <button type="button" className="ui-button ui-button-secondary">Apple (placeholder)</button>
              </div>
            </form>
            <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>¿No tienes cuenta? <Link href={`/registro?role=${selectedRole}`}>Regístrate</Link></p>
          </Card>
        </div>
      </Container>
    </main>
  );
}
