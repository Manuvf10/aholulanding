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
  }

  return (
    <main className="container-custom py-10">
      <div className="card">
        <h1 className="text-3xl font-bold">{pro.name}</h1>
        <p className="mt-2 text-slate-600">{pro.category} · {pro.city}</p>
        <p className="mt-3">{pro.description}</p>
        <p className="mt-3 text-sm">Servicios: {pro.services.join(", ")}</p>
        <p className="text-sm">Zona: {pro.workZones.join(", ")}</p>
        <button className="btn-primary mt-4" onClick={() => setOpen(true)}>Solicitar presupuesto</button>
      </div>

      <section className="mt-6 card">
        <h2 className="text-xl font-semibold">Reseñas</h2>
        <p className="text-sm">⭐ {pro.rating} ({pro.reviewsCount})</p>
        <div className="mt-3 space-y-2">
          {pro.reviews.map((r) => <div key={r.id} className="rounded-lg border p-3 text-sm"><p className="font-medium">{r.author} · {r.date}</p><p>{r.comment}</p></div>)}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <form className="card w-full max-w-md" onSubmit={submitReq}>
            <h3 className="text-lg font-semibold">Solicitar presupuesto</h3>
            <label className="label mt-2">Mensaje</label>
            <textarea className="input" required value={message} onChange={(e)=>setMessage(e.target.value)} />
            <label className="label mt-2">Fecha preferida</label>
            <input className="input" type="date" required value={date} onChange={(e)=>setDate(e.target.value)} />
            {ok && <p className="mt-2 text-sm text-green-700">Solicitud enviada.</p>}
            <div className="mt-4 flex gap-2"><button className="btn-primary" type="submit">Enviar</button><button type="button" className="btn-secondary" onClick={()=>setOpen(false)}>Cerrar</button></div>
          </form>
        </div>
      )}
    </main>
  );
}
