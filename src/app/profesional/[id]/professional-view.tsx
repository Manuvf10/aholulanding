"use client";

import { useEffect, useRef, useState } from "react";
import { professionals } from "@/data/professionals";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";

export default function ProfessionalView({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const pro = professionals.find((p) => p.id === id) ?? professionals[0];

  useEffect(() => {
    if (!open || !modalRef.current) return;
    const root = modalRef.current;
    const focusables = root.querySelectorAll<HTMLElement>("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])");
    focusables[0]?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);

  async function submitReq(e: React.FormEvent) {
    e.preventDefault();
    if (!message || !date) {
      setError("Completa mensaje y fecha preferida.");
      return;
    }
    setError("");
    await fetch("/api/mock/requests", { method: "POST", body: JSON.stringify({ professionalId: pro.id, professionalName: pro.name, message, preferredDate: date }) });
    setOk(true);
    setTimeout(() => setOk(false), 2400);
  }

  return (
    <main className="ui-section">
      <Container>
        <Card className="overflow-hidden p-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pro.photo} alt={`Foto de ${pro.name}`} className="h-60 w-full object-cover sm:h-80" />
          <div className="grid gap-6 p-6 lg:grid-cols-[1fr_300px]">
            <section>
              <h1 className="ui-h2">{pro.name}</h1>
              <p className="ui-subtitle">{pro.category} · {pro.city}</p>
              <div className="mt-3 flex flex-wrap gap-2">{pro.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>
              <h3 className="ui-h3 mt-6">Sobre mí</h3>
              <p className="ui-subtitle mt-2">{pro.description}</p>
              <h3 className="ui-h3 mt-6">Servicios</h3>
              <p className="ui-subtitle mt-2">{pro.services.join(", ")}</p>
              <h3 className="ui-h3 mt-6">Zona de trabajo</h3>
              <p className="ui-subtitle mt-2">{pro.workZones.join(", ")}</p>
            </section>

            <aside className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Resumen</p>
              <p className="mt-3 text-3xl font-semibold">{pro.basePrice}€</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>desde</p>
              <p className="mt-2 text-sm">⭐ {pro.rating} ({pro.reviewsCount})</p>
              <button className="ui-button ui-button-primary mt-4 w-full" onClick={() => setOpen(true)}>Solicitar presupuesto</button>
            </aside>
          </div>
        </Card>

        <Card className="mt-6">
          <h3 className="ui-h3">Reseñas recientes</h3>
          <div className="mt-4 space-y-3">
            {pro.reviews.map((r) => (
              <article key={r.id} className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                <p className="text-sm font-semibold">{r.author} · {r.date}</p>
                <p className="ui-subtitle mt-1">{r.comment}</p>
              </article>
            ))}
          </div>
        </Card>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Solicitar presupuesto">
            <div ref={modalRef} className="w-full max-w-md">
            <Card className="w-full max-w-md">
              <h3 className="ui-h3">Solicitar presupuesto a {pro.name}</h3>
              <form className="mt-3" onSubmit={submitReq}>
                <label className="text-sm font-medium">Mensaje</label>
                <textarea className="ui-input mt-1" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
                <label className="mt-3 block text-sm font-medium">Fecha preferida</label>
                <input className="ui-input mt-1" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                {error && <Alert tone="error" className="mt-3">{error}</Alert>}
                {ok && <Alert tone="success" className="mt-3">Solicitud enviada correctamente.</Alert>}
                <div className="mt-4 flex gap-2">
                  <button className="ui-button ui-button-primary" type="submit">Enviar</button>
                  <button type="button" className="ui-button ui-button-secondary" onClick={() => setOpen(false)}>Cerrar</button>
                </div>
              </form>
            </Card>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
