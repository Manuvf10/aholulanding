import { categoriesList } from "@/data/professionals";

const icons: Record<string, string> = {
  Fontanería: "🚰",
  Electricidad: "⚡",
  Jardinería: "🌿",
  Pintura: "🎨",
  Limpieza: "🧼",
};

export default function CategoriasPage() {
  return (
    <main className="container-custom py-10">
      <h1 className="section-title">Categorías</h1>
      <p className="section-subtitle">Explora oficios con profesionales listos para ayudarte.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {categoriesList.map((c) => (
          <div key={c} className="card card-hover">
            <p className="text-2xl">{icons[c] ?? "🛠️"}</p>
            <p className="mt-2 text-lg font-semibold">{c}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Expertos verificados y reseñados.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
