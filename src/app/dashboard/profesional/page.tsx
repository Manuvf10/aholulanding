"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { serviceRequests } from "@/lib/mock-db";
import { professionals } from "@/data/professionals";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";

export default function DashboardProfesional() {
  const [items, setItems] = useState(serviceRequests);
  const [msg, setMsg] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const updateStatus = (id: string, status: "aceptado" | "rechazado") => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    setMsg(`Solicitud ${status}.`);
    setTimeout(() => setMsg(""), 1800);
  };

  const list = useMemo(() => {
    return items.filter((_, idx) => {
      if (urgencyFilter === "urgent" && idx % 2 !== 0) return false;
      if (categoryFilter !== "all") return idx % 2 === 0;
      return true;
    });
  }, [items, categoryFilter, urgencyFilter]);

  const stats = useMemo(() => ({
    total: list.length,
    accepted: list.filter((i) => i.status === "aceptado").length,
    pending: list.filter((i) => i.status === "enviado").length,
  }), [list]);

  const publicProfileId = professionals[0]?.id;

  return (
    <main className="ui-section">
      <Container>
        <div className="mb-4 flex gap-2 lg:hidden">
          <span className="ui-button ui-button-secondary">Solicitudes</span>
          <span className="ui-button ui-button-ghost">Mi perfil</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="ui-card hidden h-fit lg:block">
            <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Panel profesional</p>
            <div className="mt-3 space-y-2"><p className="ui-badge">Solicitudes nuevas</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>Mi perfil</p></div>
          </aside>

          <section>
            <SectionHeader title="Solicitudes nuevas en tu zona" subtitle="Filtra y responde rápidamente para mejorar tu conversión." />
            {msg && <Alert tone="success" className="mt-4">{msg}</Alert>}

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <select className="ui-input" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">Categoría: todas</option>
                <option value="cat-a">Categoría: principal</option>
              </select>
              <select className="ui-input"><option>Distancia: 5km</option><option>10km</option><option>25km</option></select>
              <select className="ui-input" value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)}>
                <option value="all">Urgencia: todas</option>
                <option value="urgent">Solo urgentes</option>
              </select>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Totales</p><p className="text-2xl font-semibold">{stats.total}</p></div>
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Aceptadas</p><p className="text-2xl font-semibold">{stats.accepted}</p></div>
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Pendientes</p><p className="text-2xl font-semibold">{stats.pending}</p></div>
            </div>

            <div className="mt-6 space-y-3">
              {list.length === 0 ? (
                <div className="ui-empty">
                  <p className="text-3xl">📨</p>
                  <p className="mt-2 font-semibold">No hay solicitudes ahora</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Tip: mantén tus servicios y disponibilidad actualizados.</p>
                </div>
              ) : (
                list.map((r, idx) => (
                  <Card key={r.id} className="ui-card-hover">
                    <p className="font-semibold">Solicitud #{idx + 1}</p>
                    <p className="ui-subtitle mt-1">{r.message}</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Zona: Madrid · Fecha: {r.preferredDate} · Presupuesto estimado: {90 + idx * 20}€</p>
                    <div className="mt-2 flex gap-2">
                      {idx % 2 === 0 ? <span className="ui-badge">Urgente</span> : <span className="ui-badge">Normal</span>}
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button className="ui-button ui-button-primary" onClick={() => updateStatus(r.id, "aceptado")}>Aceptar</button>
                      <button className="ui-button ui-button-secondary" onClick={() => updateStatus(r.id, "rechazado")}>Rechazar</button>
                    </div>
                  </Card>
                ))
              )}
            </div>

            <Card className="mt-8">
              <h3 className="ui-h3">Tu perfil</h3>
              <p className="ui-subtitle">Rating mock: ⭐ 4.8 · Servicios activos: 5 · Disponibilidad: Lun-Sáb</p>
              {publicProfileId && <Link href={`/profesional/${publicProfileId}`} className="ui-button ui-button-secondary mt-3">Ver mi perfil público</Link>}
            </Card>
          </section>
        </div>
      </Container>
    </main>
  );
}
