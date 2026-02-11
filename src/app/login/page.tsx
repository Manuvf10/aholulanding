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
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="ui-app-hero relative overflow-hidden p-8">
            <div className="ui-blob ui-blob-a" />
            <div className="ui-blob ui-blob-c" />
            <div className="relative z-10">
              <p className="ui-badge">Acceso seguro</p>
              <h1 className="ui-h2 mt-4">Inicia sesión y entra en modo {selectedRole === "CLIENTE" ? "Cliente" : "Profesional"}</h1>
              <p className="ui-subtitle">Cliente: encuentra y solicita. Profesional: recibe leads y gestiona respuestas.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Cliente demo</p><p className="text-sm font-semibold">cliente@demo.com</p></div>
                <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Profesional demo</p><p className="text-sm font-semibold">pro@demo.com</p></div>
              </div>
            </div>
          </section>

          <Card className="ui-panel border-0">
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
            <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>¿No tienes cuenta? <Link className="ui-link" href={`/registro?role=${selectedRole}`}>Regístrate</Link></p>
          </Card>
        </div>
      </Container>
    </main>
  );
}
