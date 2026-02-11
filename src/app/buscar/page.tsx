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
      <p className="section-subtitle">Encuentra por ubicación, compara confianza y decide con claridad.</p>

      <section className="card mt-6">
        <div className="grid gap-3 md:grid-cols-5">
          <div className="input-wrapper md:col-span-2">
            <span className="input-icon">📍</span>
            <input className="input input-with-icon" name="city" form="search-form" placeholder="Ciudad o código postal" defaultValue={city} />
          </div>
          <select className="select" name="radius" form="search-form" defaultValue={String(radius)}>{[5, 10, 25].map((v) => <option key={v} value={v}>{v} km</option>)}</select>
          <select className="select" name="category" form="search-form" defaultValue={category}>{["", ...categoriesList].map((v) => <option key={v} value={v}>{v || "Todas las categorías"}</option>)}</select>
          <select className="select" name="sort" form="search-form" defaultValue={sort}><option value="rating">Mejor valorados</option><option value="distance">Más cercanos</option><option value="price">Más económicos</option></select>
        </div>
        <form id="search-form" method="GET" className="mt-3"><button className="btn-primary">Aplicar filtros</button></form>
      </section>

      <section className="mt-7 space-y-4">
        {filtered.map((p) => (
          <article key={p.id} className="card card-hover flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photo} alt={`Foto de ${p.name}`} className="h-20 w-20 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold">{p.name}</p>
                <p className="mt-0.5 text-sm text-[var(--muted)]">{p.category} · {p.city} · {p.distance} km</p>
                <div className="mt-2 flex flex-wrap gap-2">{p.badges.map((b) => <span key={b} className="badge">{b}</span>)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
              <div className="text-right">
                <p className="text-xl font-semibold">{p.basePrice}€ <span className="text-xs font-normal text-[var(--muted)]">desde</span></p>
                <p className="text-sm text-[var(--muted)]">⭐ {p.rating} · {p.reviewsCount} reseñas</p>
              </div>
              <Link href={`/profesional/${p.id}`} className="btn-secondary">Ver perfil</Link>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state">
            <p className="text-3xl">🔎</p>
            <p className="mt-2 font-semibold">No encontramos profesionales con esos filtros</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Amplía el radio de búsqueda o prueba otra categoría.</p>
          </div>
        )}
      </section>
    </main>
  );
}
