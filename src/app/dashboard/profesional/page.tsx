"use client";

import { useMemo, useState } from "react";
import { serviceRequests } from "@/lib/mock-db";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";

export default function DashboardProfesional() {
  const [items, setItems] = useState(serviceRequests);
  const [msg, setMsg] = useState("");

  const updateStatus = (id: string, status: "aceptado" | "rechazado") => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    setMsg(`Solicitud ${status}.`);
    setTimeout(() => setMsg(""), 1600);
  };

  const stats = useMemo(() => ({
    total: items.length,
    accepted: items.filter((i) => i.status === "aceptado").length,
    pending: items.filter((i) => i.status === "enviado").length,
  }), [items]);

  return (
    <main className="ui-section">
      <Container>
        <div className="mb-4 flex gap-2 lg:hidden">
          <span className="ui-button ui-button-secondary">Solicitudes</span>
          <span className="ui-button ui-button-ghost">Perfil</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="ui-card hidden h-fit lg:block">
            <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Panel profesional</p>
            <div className="mt-3 space-y-2"><p className="ui-badge">Solicitudes</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>Editar perfil (próx.)</p></div>
          </aside>
          <section>
            <SectionHeader title="Solicitudes recibidas" subtitle="Responde y convierte más rápido." />
            {msg && <Alert tone="success" className="mt-4">{msg}</Alert>}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Totales</p><p className="text-2xl font-semibold">{stats.total}</p></div>
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Aceptadas</p><p className="text-2xl font-semibold">{stats.accepted}</p></div>
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Pendientes</p><p className="text-2xl font-semibold">{stats.pending}</p></div>
            </div>

            <div className="mt-6 space-y-3">
              {items.length === 0 ? (
                <div className="ui-empty"><p className="text-3xl">📨</p><p className="mt-2 font-semibold">No hay solicitudes</p></div>
              ) : (
                items.map((r) => (
                  <Card key={r.id} className="ui-card-hover">
                    <p className="font-semibold">Cliente: {r.clientEmail}</p>
                    <p className="ui-subtitle mt-1">{r.message}</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Fecha preferida: {r.preferredDate}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <StatusBadge status={r.status} />
                      <button className="ui-button ui-button-primary" onClick={() => updateStatus(r.id, "aceptado")}>Aceptar</button>
                      <button className="ui-button ui-button-secondary" onClick={() => updateStatus(r.id, "rechazado")}>Rechazar</button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
