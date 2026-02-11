"use client";

import { useState } from "react";
import { professionals } from "@/data/professionals";

export default function ProfessionalView({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [ok, setOk] = useState(false);
  const pro = professionals.find((p) => p.id === id) ?? professionals[0];

  async function submitReq(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/mock/requests", { method: "POST", body: JSON.stringify({ professionalId: pro.id, professionalName: pro.name, message, preferredDate: date }) });
    setOk(true);
    setTimeout(() => setOk(false), 2400);
  }

  return (
    <main className="container-custom py-10">
      <section className="card overflow-hidden p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pro.photo} alt={`Foto de ${pro.name}`} className="h-56 w-full object-cover sm:h-72" />
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_280px]">
          <div>
            <h1 className="text-3xl font-semibold">{pro.name}</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">{pro.category} · {pro.city}</p>
            <div className="mt-3 flex flex-wrap gap-2">{pro.badges.map((b) => <span key={b} className="badge">{b}</span>)}</div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{pro.description}</p>

            <div className="mt-5 space-y-2 text-sm">
              <p><strong>Servicios:</strong> {pro.services.join(", ")}</p>
              <p><strong>Zona de trabajo:</strong> {pro.workZones.join(", ")}</p>
            </div>
          </div>

          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Información clave</p>
            <p className="mt-3 text-2xl font-semibold">{pro.basePrice}€ <span className="text-xs font-normal text-[var(--muted)]">desde</span></p>
            <p className="mt-1 text-sm">⭐ {pro.rating} ({pro.reviewsCount})</p>
            <button className="btn-primary mt-4 w-full" onClick={() => setOpen(true)}>Solicitar presupuesto</button>
          </aside>
        </div>
      </section>

      <section className="card mt-6">
        <h2 className="text-xl font-semibold">Reseñas</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Opiniones recientes de clientes</p>
        <div className="mt-4 space-y-3">
          {pro.reviews.map((r) => (
            <article key={r.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
              <p className="text-sm font-semibold">{r.author} · {r.date}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{r.comment}</p>
            </article>
          ))}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <form className="card w-full max-w-md" onSubmit={submitReq}>
            <h3 className="text-lg font-semibold">Solicitar presupuesto a {pro.name}</h3>
            <label className="label mt-3">Mensaje</label>
            <textarea className="textarea" required value={message} onChange={(e) => setMessage(e.target.value)} />
            <label className="label mt-3">Fecha preferida</label>
            <input className="input" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            {ok && <p className="mt-3 text-sm text-[var(--success)]">Solicitud enviada correctamente.</p>}
            <div className="mt-4 flex gap-2">
              <button className="btn-primary" type="submit">Enviar</button>
              <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>Cerrar</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
