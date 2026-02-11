"use client";

import { useMemo, useState } from "react";
import { serviceRequests } from "@/lib/mock-db";

export default function DashboardProfesional() {
  const [items, setItems] = useState(serviceRequests);

  const updateStatus = (id: string, status: "aceptado" | "rechazado") => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const stats = useMemo(() => ({
    total: items.length,
    accepted: items.filter((i) => i.status === "aceptado").length,
    pending: items.filter((i) => i.status === "enviado").length,
  }), [items]);

  return (
    <main className="container-custom py-10">
      <h1 className="section-title">Panel profesional</h1>
      <p className="section-subtitle">Gestiona tus solicitudes y responde de forma rápida a tus clientes.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="kpi"><p className="text-xs text-[var(--muted)]">Total</p><p className="text-2xl font-semibold">{stats.total}</p></div>
        <div className="kpi"><p className="text-xs text-[var(--muted)]">Aceptadas</p><p className="text-2xl font-semibold">{stats.accepted}</p></div>
        <div className="kpi"><p className="text-xs text-[var(--muted)]">Pendientes</p><p className="text-2xl font-semibold">{stats.pending}</p></div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((r) => (
          <article key={r.id} className="card">
            <p className="font-semibold">Cliente: {r.clientEmail}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{r.message}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Fecha preferida: {r.preferredDate}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge capitalize">{r.status}</span>
              <button className="btn-primary" onClick={() => updateStatus(r.id, "aceptado")}>Aceptar</button>
              <button className="btn-secondary" onClick={() => updateStatus(r.id, "rechazado")}>Rechazar</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
