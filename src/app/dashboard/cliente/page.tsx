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
      <h1 className="text-3xl font-bold">Mis solicitudes</h1>
      <div className="mt-6 space-y-3">
        {items.map((r)=><div key={r.id} className="card"><p className="font-medium">{r.professionalName}</p><p className="text-sm">{r.message}</p><p className="text-sm capitalize">Estado: {r.status}</p></div>)}
      </div>
    </main>
  );
}
