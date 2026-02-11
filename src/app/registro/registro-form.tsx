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
    <form className="card mt-6 grid max-w-2xl gap-3" onSubmit={onSubmit}>
      <div><label className="label">Nombre</label><input name="name" className="input" required /></div>
      <div><label className="label">Email</label><input name="email" type="email" className="input" required /></div>
      <div><label className="label">Contraseña</label><input name="password" type="password" className="input" required minLength={6} /></div>
      <div>
        <label className="label">Ciudad / CP</label>
        <select name="city" className="input">
          {cityPostalPairs.map((p)=> <option key={p.city} value={p.city}>{p.city} ({p.postalCode})</option>)}
        </select>
      </div>
      {role === "PROFESIONAL" && (
        <>
          <div><label className="label">Oficio</label><select className="input" name="category">{categoriesList.map(c=><option key={c}>{c}</option>)}</select></div>
          <div><label className="label">Tarifa base (€)</label><input className="input" name="basePrice" type="number" defaultValue={45} /></div>
          <div><label className="label">Descripción</label><textarea className="input" name="description" rows={3} /></div>
          <div><label className="label">Disponibilidad</label><div className="flex flex-wrap gap-3">{["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"].map(d => <label key={d} className="text-sm"><input type="checkbox" name="availability" value={d} className="mr-1"/>{d}</label>)}</div></div>
          <label className="text-sm"><input type="checkbox" required className="mr-2"/>Acepto términos y condiciones</label>
        </>
      )}
      <button className="btn-primary mt-2" type="submit">Crear cuenta</button>
    </form>
  );
}
