import { serviceRequests } from "@/lib/mock-db";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/Badge";

export default async function DashboardCliente() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "CLIENTE") redirect("/dashboard/profesional");
  const items = serviceRequests.filter((r) => r.clientEmail === user.email);

  return (
    <main className="ui-section">
      <Container>
        <div className="mb-4 flex gap-2 lg:hidden">
          <span className="ui-button ui-button-secondary">Solicitudes</span>
          <span className="ui-button ui-button-ghost">Perfil</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="ui-card hidden h-fit lg:block">
            <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Panel cliente</p>
            <div className="mt-3 space-y-2"><p className="ui-badge">Mis solicitudes</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>Perfil (próximamente)</p></div>
          </aside>
          <section>
            <SectionHeader title="Mis solicitudes" subtitle="Sigue el estado de cada presupuesto enviado." />
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Totales</p><p className="text-2xl font-semibold">{items.length}</p></div>
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Aceptadas</p><p className="text-2xl font-semibold">{items.filter((i) => i.status === "aceptado").length}</p></div>
              <div className="ui-kpi"><p className="text-xs" style={{ color: "var(--text-muted)" }}>Pendientes</p><p className="text-2xl font-semibold">{items.filter((i) => i.status === "enviado").length}</p></div>
            </div>
            <div className="mt-6 space-y-3">
              {items.length === 0 ? (
                <div className="ui-empty"><p className="text-3xl">📭</p><p className="mt-2 font-semibold">Aún no tienes solicitudes</p></div>
              ) : (
                items.map((r) => (
                  <Card key={r.id} className="ui-card-hover">
                    <p className="font-semibold">{r.professionalName}</p>
                    <p className="ui-subtitle mt-1">{r.message}</p>
                    <div className="mt-3"><StatusBadge status={r.status} /></div>
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
