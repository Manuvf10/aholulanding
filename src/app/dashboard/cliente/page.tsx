import Link from "next/link";
import { serviceRequests } from "@/lib/mock-db";
import { professionals } from "@/data/professionals";
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
  const recommended = professionals.slice(0, 3);

  return (
    <main className="ui-section">
      <Container>
        <div className="mb-4 flex gap-2 lg:hidden">
          <span className="ui-button ui-button-secondary">Solicitudes</span>
          <span className="ui-button ui-button-ghost">Recomendados</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="ui-panel rounded-2xl p-5 hidden h-fit lg:block">
            <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Panel cliente</p>
            <div className="mt-3 space-y-2"><p className="ui-badge">Mis solicitudes</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>Recomendados</p></div>
          </aside>

          <section className="ui-panel rounded-2xl p-5 sm:p-6">
            <SectionHeader title="Encuentra profesionales cerca de ti" subtitle="Gestiona solicitudes y descubre perfiles recomendados." />

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link href="/buscar" className="ui-button ui-button-primary">Buscar</Link>
              <Link href="/categorias" className="ui-button ui-button-secondary">Ver categorías</Link>
              <a href="#mis-solicitudes" className="ui-button ui-button-secondary">Mis solicitudes</a>
            </div>

            <div id="mis-solicitudes" className="mt-8">
              <h3 className="ui-h3">Mis solicitudes</h3>
              <div className="ui-list-grid mt-4">
                {items.length === 0 ? (
                  <div className="ui-empty">
                    <p className="text-3xl">📭</p>
                    <p className="mt-2 font-semibold">Aún no has enviado solicitudes</p>
                    <Link href="/buscar" className="ui-button ui-button-primary mt-4">Buscar profesionales</Link>
                  </div>
                ) : (
                  items.map((r, idx) => (
                    <Card key={r.id} className="ui-card-hover">
                      <p className="font-semibold">{r.professionalName}</p>
                      <p className="ui-subtitle mt-1">{r.message}</p>
                      <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Zona: {user.city} · Fecha: {r.preferredDate} · Presupuesto estimado: {70 + idx * 15}€</p>
                      <div className="mt-3 flex items-center gap-2"><StatusBadge status={r.status} />{r.status === "enviado" && <span className="ui-badge">Respondida: pendiente</span>}</div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <div className="mt-8 ui-soft-divider pt-8">
              <h3 className="ui-h3">Recomendados para ti</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {recommended.map((pro) => (
                  <Card key={pro.id} className="ui-card-hover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pro.photo} alt={pro.name} className="h-14 w-14 rounded-xl object-cover" />
                    <p className="mt-2 font-semibold">{pro.name}</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{pro.category} · {pro.city}</p>
                    <p className="text-sm">⭐ {pro.rating} · Desde {pro.basePrice}€</p>
                    <div className="mt-3 flex gap-2">
                      <Link href={`/profesional/${pro.id}`} className="ui-button ui-button-secondary">Ver perfil</Link>
                      <Link href={`/profesional/${pro.id}`} className="ui-button ui-button-primary">Solicitar</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
