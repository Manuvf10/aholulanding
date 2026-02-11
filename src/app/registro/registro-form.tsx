"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categoriesList, cityPostalPairs } from "@/data/professionals";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Alert } from "@/components/ui/Alert";

export default function RegistroForm({ role }: { role: "CLIENTE" | "PROFESIONAL" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify({ ...payload, role }) });
    setLoading(false);
    if (!res.ok) return setError("No se pudo completar el registro. Revisa los datos.");
    router.push(`/login?role=${role}`);
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border p-1" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
        <Link href="/registro?role=CLIENTE" className={`ui-button ${role === "CLIENTE" ? "ui-button-primary" : "ui-button-ghost"}`}>Cliente</Link>
        <Link href="/registro?role=PROFESIONAL" className={`ui-button ${role === "PROFESIONAL" ? "ui-button-primary" : "ui-button-ghost"}`}>Profesional</Link>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="text-sm font-medium">Nombre</label><Input icon="👤" name="name" required /></div>
          <div><label className="text-sm font-medium">Email</label><Input icon="✉️" name="email" type="email" required /></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="text-sm font-medium">Contraseña</label><Input icon="🔒" name="password" type="password" required minLength={6} /></div>
          <div><label className="text-sm font-medium">Ciudad / CP</label><Select name="city">{cityPostalPairs.map((p) => <option key={p.city} value={p.city}>{p.city} ({p.postalCode})</option>)}</Select></div>
        </div>

        {role === "PROFESIONAL" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="text-sm font-medium">Oficio</label><Select name="category">{categoriesList.map((c) => <option key={c}>{c}</option>)}</Select></div>
              <div><label className="text-sm font-medium">Tarifa base (€)</label><Input icon="💶" name="basePrice" type="number" defaultValue={45} /></div>
            </div>
            <div><label className="text-sm font-medium">Descripción</label><Textarea rows={3} name="description" /></div>
            <div>
              <label className="text-sm font-medium">Disponibilidad</label>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((d) => (
                  <label key={d} className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                    <input type="checkbox" name="availability" value={d} className="mr-2" />{d}
                  </label>
                ))}
              </div>
            </div>
            <div><label className="text-sm font-medium">Foto (placeholder)</label><Input name="photo" placeholder="URL opcional" /></div>
            <label className="text-sm" style={{ color: "var(--text-muted)" }}><input type="checkbox" required className="mr-2" />Acepto términos y condiciones</label>
          </>
        )}
        {error && <Alert tone="error">{error}</Alert>}
        <button className="ui-button ui-button-primary" type="submit" disabled={loading}>{loading ? "Creando cuenta..." : "Crear cuenta"}</button>
      </form>
    </>
  );
}
