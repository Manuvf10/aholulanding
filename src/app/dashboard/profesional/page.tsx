"use client";
import { useState } from "react";
import { serviceRequests } from "@/lib/mock-db";

export default function DashboardProfesional() {
  const [items, setItems] = useState(serviceRequests);

  const updateStatus = (id: string, status: "aceptado" | "rechazado") => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  return (
    <main className="container-custom py-10">
      <h1 className="text-3xl font-bold">Solicitudes recibidas</h1>
      <div className="mt-6 space-y-3">
        {items.map((r) => (
          <div key={r.id} className="card">
            <p className="font-medium">{r.clientEmail}</p>
            <p className="text-sm">{r.message}</p>
            <p className="text-sm">Fecha: {r.preferredDate} · Estado: {r.status}</p>
            <div className="mt-2 flex gap-2">
              <button className="btn-primary" onClick={() => updateStatus(r.id, "aceptado")}>Aceptar</button>
              <button className="btn-secondary" onClick={() => updateStatus(r.id, "rechazado")}>Rechazar</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
