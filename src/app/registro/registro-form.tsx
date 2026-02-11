"use client";

import { useRouter } from "next/navigation";
import { categoriesList, cityPostalPairs } from "@/data/professionals";

export default function RegistroForm({ role }: { role: "CLIENTE" | "PROFESIONAL" }) {
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify({ ...payload, role }) });
    if (res.ok) router.push("/login");
  }

  return (
    <form className="card mt-6 grid max-w-3xl gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label">Nombre</label><input name="name" className="input" required /></div>
        <div><label className="label">Email</label><input name="email" type="email" className="input" required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label">Contraseña</label><input name="password" type="password" className="input" required minLength={6} /></div>
        <div>
          <label className="label">Ciudad / CP</label>
          <select name="city" className="select">
            {cityPostalPairs.map((p) => <option key={p.city} value={p.city}>{p.city} ({p.postalCode})</option>)}
          </select>
        </div>
      </div>

      {role === "PROFESIONAL" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label">Oficio</label><select className="select" name="category">{categoriesList.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="label">Tarifa base (€)</label><input className="input" name="basePrice" type="number" defaultValue={45} /></div>
          </div>

          <div><label className="label">Descripción</label><textarea className="textarea" name="description" rows={3} placeholder="Cuéntanos tu experiencia y especialidades" /></div>

          <div>
            <label className="label">Disponibilidad</label>
            <div className="flex flex-wrap gap-3 text-sm">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((d) => (
                <label key={d} className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                  <input type="checkbox" name="availability" value={d} />
                  {d}
                </label>
              ))}
            </div>
          </div>

          <div><label className="label">Foto (placeholder)</label><input className="input" placeholder="URL de foto de perfil (opcional)" name="photo" /></div>

          <label className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
            <input type="checkbox" required /> Acepto términos y condiciones
          </label>
        </>
      )}
      <button className="btn-primary mt-1" type="submit">Crear cuenta</button>
    </form>
  );
}
