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
      <h1 className="text-3xl font-bold">Buscar profesionales</h1>
      <form className="card mt-6 grid gap-3 md:grid-cols-4" method="GET">
        <input className="input" name="city" placeholder="Ciudad" defaultValue={city} />
        <select className="input" name="radius" defaultValue={String(radius)}>{[5,10,25].map((v)=><option key={v} value={v}>{v} km</option>)}</select>
        <select className="input" name="category" defaultValue={category}>{["",...categoriesList].map((v)=> <option key={v} value={v}>{v || "Todas"}</option>)}</select>
        <select className="input" name="sort" defaultValue={sort}><option value="rating">Mejor valorados</option><option value="distance">Más cercanos</option><option value="price">Más económicos</option></select>
        <button className="btn-primary md:col-span-4" type="submit">Aplicar filtros</button>
      </form>

      <div className="mt-6 grid gap-4">
        {filtered.map((p) => (
          <article key={p.id} className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold">{p.name}</p>
              <p className="text-sm text-slate-600">{p.category} · {p.city} · {p.distance}km</p>
              <p className="text-sm">Desde {p.basePrice}€ · ⭐ {p.rating} ({p.reviewsCount})</p>
              <div className="mt-2 flex gap-2">{p.badges.map((b)=><span key={b} className="rounded-full bg-slate-100 px-2 py-1 text-xs">{b}</span>)}</div>
            </div>
            <Link href={`/profesional/${p.id}`} className="btn-secondary">Ver perfil</Link>
          </article>
        ))}
        {filtered.length === 0 && <div className="card">No hay resultados con estos filtros.</div>}
      </div>
    </main>
  );
}
