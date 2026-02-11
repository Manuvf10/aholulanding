import { serviceRequests } from "@/lib/mock-db";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardCliente() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "CLIENTE") redirect("/dashboard/profesional");
  const items = serviceRequests.filter((r) => r.clientEmail === user.email);

  return (
    <main className="container-custom py-10">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="card h-fit">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Panel cliente</p>
          <nav className="mt-3 space-y-2 text-sm">
            <p className="rounded-lg bg-[var(--primary-soft)] px-3 py-2 font-semibold">Mis solicitudes</p>
            <p className="rounded-lg px-3 py-2 text-[var(--muted)]">Mi perfil (próximamente)</p>
          </nav>
        </aside>

        <section>
          <h1 className="section-title">Mis solicitudes</h1>
          <p className="section-subtitle">Haz seguimiento del estado de cada petición enviada.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="kpi"><p className="text-xs text-[var(--muted)]">Totales</p><p className="text-2xl font-semibold">{items.length}</p></div>
            <div className="kpi"><p className="text-xs text-[var(--muted)]">Aceptadas</p><p className="text-2xl font-semibold">{items.filter((i) => i.status === "aceptado").length}</p></div>
            <div className="kpi"><p className="text-xs text-[var(--muted)]">Pendientes</p><p className="text-2xl font-semibold">{items.filter((i) => i.status === "enviado").length}</p></div>
          </div>

          <div className="mt-6 space-y-3">
            {items.length === 0 ? (
              <div className="empty-state">
                <p className="text-3xl">📭</p>
                <p className="mt-2 font-semibold">Aún no has enviado solicitudes</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Cuando contactes profesionales, aparecerán aquí.</p>
              </div>
            ) : (
              items.map((r) => (
                <article key={r.id} className="card card-hover">
                  <p className="font-semibold">{r.professionalName}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{r.message}</p>
                  <span className={`badge-status mt-3 ${r.status}`}>Estado: {r.status}</span>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
