import { categoriesList } from "@/data/professionals";

export default function CategoriasPage() {
  return (
    <main className="container-custom py-10">
      <h1 className="section-title">Categorías</h1>
      <p className="section-subtitle">Explora los oficios más demandados en tu zona.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {categoriesList.map((c) => (
          <div key={c} className="card">
            <p className="text-lg font-semibold">{c}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Profesionales listos para ayudarte.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
