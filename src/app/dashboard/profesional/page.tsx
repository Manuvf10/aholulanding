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
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="card h-fit">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Panel profesional</p>
          <nav className="mt-3 space-y-2 text-sm">
            <p className="rounded-lg bg-[var(--primary-soft)] px-3 py-2 font-semibold">Solicitudes recibidas</p>
            <p className="rounded-lg px-3 py-2 text-[var(--muted)]">Editar perfil (próximamente)</p>
          </nav>
        </aside>

        <section>
          <h1 className="section-title">Solicitudes recibidas</h1>
          <p className="section-subtitle">Responde rápido y mejora tu tasa de conversión.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="kpi"><p className="text-xs text-[var(--muted)]">Totales</p><p className="text-2xl font-semibold">{stats.total}</p></div>
            <div className="kpi"><p className="text-xs text-[var(--muted)]">Aceptadas</p><p className="text-2xl font-semibold">{stats.accepted}</p></div>
            <div className="kpi"><p className="text-xs text-[var(--muted)]">Pendientes</p><p className="text-2xl font-semibold">{stats.pending}</p></div>
          </div>

          <div className="mt-6 space-y-3">
            {items.length === 0 ? (
              <div className="empty-state">
                <p className="text-3xl">📨</p>
                <p className="mt-2 font-semibold">No hay solicitudes por ahora</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Cuando un cliente contacte, aparecerá aquí.</p>
              </div>
            ) : (
              items.map((r) => (
                <article key={r.id} className="card card-hover">
                  <p className="font-semibold">Cliente: {r.clientEmail}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{r.message}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">Fecha preferida: {r.preferredDate}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className={`badge-status ${r.status}`}>{r.status}</span>
                    <button className="btn-primary" onClick={() => updateStatus(r.id, "aceptado")}>Aceptar</button>
                    <button className="btn-secondary" onClick={() => updateStatus(r.id, "rechazado")}>Rechazar</button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
