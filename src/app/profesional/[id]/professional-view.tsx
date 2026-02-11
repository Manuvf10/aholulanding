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
    setTimeout(() => setOk(false), 2500);
  }

  return (
    <main className="container-custom py-10">
      <section className="card grid gap-6 md:grid-cols-[220px_1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pro.photo} alt={`Foto de ${pro.name}`} className="h-56 w-full rounded-2xl object-cover md:h-full" />

        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">{pro.name}</h1>
              <p className="mt-1 text-sm text-[var(--muted)]">{pro.category} · {pro.city}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">Desde {pro.basePrice}€</p>
              <p className="text-sm">⭐ {pro.rating} ({pro.reviewsCount})</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{pro.description}</p>
          <p className="mt-3 text-sm"><strong>Servicios:</strong> {pro.services.join(", ")}</p>
          <p className="text-sm"><strong>Zona:</strong> {pro.workZones.join(", ")}</p>

          <div className="mt-3 flex flex-wrap gap-2">{pro.badges.map((b) => <span key={b} className="badge">{b}</span>)}</div>
          <button className="btn-primary mt-5" onClick={() => setOpen(true)}>Solicitar presupuesto</button>
        </div>
      </section>

      <section className="card mt-6">
        <h2 className="text-xl font-semibold">Reseñas y referencias</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Puntuación media: ⭐ {pro.rating} · {pro.reviewsCount} reseñas</p>
        <div className="mt-4 space-y-3">
          {pro.reviews.map((r) => (
            <article key={r.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm">
              <p className="font-medium">{r.author} · {r.date}</p>
              <p className="mt-1 text-[var(--muted)]">{r.comment}</p>
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
            {ok && <p className="mt-3 text-sm text-green-700">Solicitud enviada correctamente.</p>}
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
