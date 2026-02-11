import Link from "next/link";
import { professionals, categoriesList } from "@/data/professionals";
import { simulateDistance } from "@/lib/distance";

export default async function BuscarPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const city = params.city ?? "Madrid";
  const radius = Number(params.radius ?? 10);
  const category = params.category;
  const sort = params.sort ?? "rating";

  const filtered = professionals
    .map((p) => ({ ...p, distance: simulateDistance(city, p.city) }))
    .filter((p) => p.distance <= radius)
    .filter((p) => !category || p.category === category)
    .sort((a, b) => sort === "price" ? a.basePrice - b.basePrice : sort === "distance" ? a.distance - b.distance : b.rating - a.rating);

  return (
    <main className="container-custom py-10">
      <h1 className="section-title">Buscar profesionales</h1>
      <p className="section-subtitle">Filtra por ubicación, distancia, categoría y ordena según tu prioridad.</p>

      <form className="card mt-6 grid gap-3 md:grid-cols-5" method="GET">
        <input className="input" name="city" placeholder="Ciudad o código postal" defaultValue={city} />
        <select className="select" name="radius" defaultValue={String(radius)}>{[5, 10, 25].map((v) => <option key={v} value={v}>{v} km</option>)}</select>
        <select className="select" name="category" defaultValue={category}>{["", ...categoriesList].map((v) => <option key={v} value={v}>{v || "Todas las categorías"}</option>)}</select>
        <select className="select" name="sort" defaultValue={sort}><option value="rating">Mejor valorados</option><option value="distance">Más cercanos</option><option value="price">Más económicos</option></select>
        <button className="btn-primary" type="submit">Aplicar filtros</button>
      </form>

      <div className="mt-6 space-y-4">
        {filtered.map((p) => (
          <article key={p.id} className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photo} alt={`Foto de ${p.name}`} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[var(--primary-soft)]" />
              <div>
                <p className="text-lg font-semibold">{p.name}</p>
                <p className="text-sm text-[var(--muted)]">{p.category} · {p.city} · {p.distance} km</p>
                <p className="mt-1 text-sm">Desde <strong>{p.basePrice}€</strong> · ⭐ {p.rating} ({p.reviewsCount} reseñas)</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.badges.map((b) => <span key={b} className="badge">{b}</span>)}
                </div>
              </div>
            </div>
            <Link href={`/profesional/${p.id}`} className="btn-secondary">Ver perfil</Link>
          </article>
        ))}
        {filtered.length === 0 && <div className="card text-sm text-[var(--muted)]">No hay resultados con estos filtros. Prueba ampliando el radio.</div>}
      </div>
    </main>
  );
}
