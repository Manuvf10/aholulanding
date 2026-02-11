import Link from "next/link";
import { categoriesList } from "@/data/professionals";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

const categoryIcons: Record<string, string> = {
  Fontanería: "🚰",
  Electricidad: "⚡",
  Jardinería: "🌿",
  Pintura: "🎨",
  Limpieza: "🧼",
};

export default function LandingPage() {
  return (
    <main>
      <section className="ui-section">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge>Producto premium para servicios locales</Badge>
              <h1 className="ui-h1 mt-5">Contrata profesionales de confianza <span style={{ color: "var(--primary)" }}>en minutos</span></h1>
              <p className="ui-subtitle">Compara reputación, precio y distancia en una experiencia simple, rápida y moderna.</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/buscar" className="ui-button ui-button-primary">🔎 Buscar profesional</Link>
                <Link href="/registro?role=PROFESIONAL" className="ui-button ui-button-secondary">🧰 Soy profesional</Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="ui-kpi"><p className="text-2xl font-semibold">30.000+</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Clientes atendidos</p></div>
                <div className="ui-kpi"><p className="text-2xl font-semibold">4.9/5</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Valoración promedio</p></div>
                <div className="ui-kpi col-span-2 sm:col-span-1"><p className="text-2xl font-semibold">24h</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Tiempo de respuesta</p></div>
              </div>
            </div>

            <Card className="ui-card-hover p-6 sm:p-8">
              <p className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Categorías destacadas</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {categoriesList.map((c) => (
                  <div key={c} className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                    <p>{categoryIcons[c] ?? "🛠️"}</p>
                    <p className="mt-1 text-sm font-semibold">{c}</p>
                  </div>
                ))}
              </div>
              <Link href="/buscar" className="ui-button ui-button-primary mt-5 w-full">Empezar ahora</Link>
            </Card>
          </div>
        </Container>
      </section>

      <section className="ui-section">
        <Container>
          <SectionHeader title="Cómo funciona" subtitle="Un flujo claro, sin fricción y con máxima confianza." />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[["01", "Busca por ciudad o CP"], ["02", "Compara perfiles y reseñas"], ["03", "Solicita y contrata"]].map(([n, t]) => (
              <Card key={n} className="ui-card-hover">
                <Badge>Paso {n}</Badge>
                <h3 className="ui-h3 mt-3">{t}</h3>
                <p className="ui-subtitle mt-2">Todo en una sola plataforma, con visibilidad de precio y reputación.</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="ui-section">
        <Container>
          <SectionHeader title="Testimonios" subtitle="Historias reales de clientes y profesionales." />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {["Laura", "Miguel", "Sofía"].map((n) => (
              <Card key={n} className="ui-card-hover">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--surface-2)" }}>{n[0]}</div>
                  <div><p className="text-sm font-semibold">{n}</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>★★★★★</p></div>
                </div>
                <p className="ui-subtitle mt-3">“Excelente experiencia, diseño claro y contratación muy rápida.”</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="ui-section pt-0">
        <Container>
          <Card className="p-8 text-center sm:p-10">
            <h2 className="ui-h2">¿Listo para empezar?</h2>
            <p className="ui-subtitle mx-auto max-w-xl">Encuentra hoy al profesional ideal para tu hogar o negocio.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/buscar" className="ui-button ui-button-primary">Buscar profesional</Link>
              <Link href="/registro?role=PROFESIONAL" className="ui-button ui-button-secondary">Publicar mi perfil</Link>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}
