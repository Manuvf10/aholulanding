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
      <h1 className="section-title">Panel de cliente</h1>
      <p className="section-subtitle">Consulta el estado de tus solicitudes enviadas.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="kpi"><p className="text-xs text-[var(--muted)]">Solicitudes totales</p><p className="text-2xl font-semibold">{items.length}</p></div>
        <div className="kpi"><p className="text-xs text-[var(--muted)]">Aceptadas</p><p className="text-2xl font-semibold">{items.filter((i) => i.status === "aceptado").length}</p></div>
        <div className="kpi"><p className="text-xs text-[var(--muted)]">Pendientes</p><p className="text-2xl font-semibold">{items.filter((i) => i.status === "enviado").length}</p></div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((r) => (
          <article key={r.id} className="card">
            <p className="font-semibold">{r.professionalName}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{r.message}</p>
            <span className="badge mt-2 inline-block capitalize">Estado: {r.status}</span>
          </article>
        ))}
      </div>
    </main>
  );
}
