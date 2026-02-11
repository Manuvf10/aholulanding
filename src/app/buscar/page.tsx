import Link from "next/link";
import { professionals, categoriesList } from "@/data/professionals";
import { simulateDistance } from "@/lib/distance";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    <main className="ui-section">
      <Container>
        <SectionHeader title="Buscar profesionales" subtitle="Filtra por ubicación, categoría, precio y distancia." />

        <div className="mt-6 grid gap-6 lg:grid-cols-[290px_1fr]">
          <Card className="h-fit">
            <h3 className="text-sm font-semibold">Filtros</h3>
            <form className="mt-4 space-y-3" method="GET">
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Ubicación</label>
              <input className="ui-input" name="city" defaultValue={city} placeholder="Ciudad o CP" />
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Radio</label>
              <select className="ui-input" name="radius" defaultValue={String(radius)}>{[5, 10, 25].map((v) => <option key={v} value={v}>{v} km</option>)}</select>
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Categoría</label>
              <select className="ui-input" name="category" defaultValue={category}>{["", ...categoriesList].map((v) => <option key={v} value={v}>{v || "Todas"}</option>)}</select>
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Ordenar</label>
              <select className="ui-input" name="sort" defaultValue={sort}><option value="rating">Mejor valorados</option><option value="distance">Más cercanos</option><option value="price">Más económicos</option></select>
              <button className="ui-button ui-button-primary w-full" type="submit">Aplicar filtros</button>
            </form>
          </Card>

          <section>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{filtered.length} profesionales encontrados</p>
            <div className="mt-3 space-y-4">
              {filtered.map((p) => (
                <Card key={p.id} className="ui-card-hover flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex min-w-0 gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.photo} alt={`Foto de ${p.name}`} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold">{p.name}</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{p.category} · {p.city}</p>
                      <p className="mt-1 text-sm">⭐ {p.rating} · {p.reviewsCount} reseñas · {p.distance} km</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.badges.map((b) => <Badge key={b}>{b}</Badge>)}
                        <Badge>Disponible hoy</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                    <p className="text-xl font-semibold">{p.basePrice}€ <span className="text-xs" style={{ color: "var(--text-muted)" }}>desde</span></p>
                    <Link href={`/profesional/${p.id}`} className="ui-button ui-button-secondary">Ver perfil</Link>
                  </div>
                </Card>
              ))}

              {filtered.length === 0 && (
                <div className="ui-empty">
                  <p className="text-3xl">🔎</p>
                  <p className="mt-2 font-semibold">No encontramos resultados</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Prueba con una distancia mayor o cambia de categoría.</p>
                  <Link href="/categorias" className="ui-button ui-button-secondary mt-4">Ver categorías</Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
