import Link from "next/link";
import { redirect } from "next/navigation";
import { categoriesList } from "@/data/professionals";
import { getSessionUser } from "@/lib/auth";
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

export default async function LandingPage() {
  const user = await getSessionUser();
  if (user?.role === "CLIENTE") redirect("/dashboard/cliente");
  if (user?.role === "PROFESIONAL") redirect("/dashboard/profesional");

  return (
    <main>
      <section className="ui-section">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge>Marketplace local premium</Badge>
              <h1 className="ui-h1 mt-5">Encuentra profesionales de confianza cerca de ti</h1>
              <p className="ui-subtitle">
                todoslosoficios conecta clientes con expertos locales. Si eres cliente, busca y solicita.
                Si eres profesional, recibe solicitudes y haz crecer tu negocio.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/buscar" className="ui-button ui-button-primary">🔎 Buscar profesionales</Link>
                <Link href="/registro?role=PROFESIONAL" className="ui-button ui-button-secondary">🧰 Soy profesional</Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="ui-kpi"><p className="text-2xl font-semibold">30.000+</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Clientes satisfechos</p></div>
                <div className="ui-kpi"><p className="text-2xl font-semibold">4.9/5</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Rating promedio</p></div>
                <div className="ui-kpi col-span-2 sm:col-span-1"><p className="text-2xl font-semibold">24h</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Respuesta media</p></div>
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
              <Link href="/login" className="ui-button ui-button-primary mt-5 w-full">Iniciar sesión</Link>
            </Card>
          </div>
        </Container>
      </section>

      <section className="ui-section">
        <Container>
          <SectionHeader title="Cómo funciona" subtitle="Entiéndelo en 10 segundos." />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {["1. Busca por zona", "2. Compara perfiles", "3. Solicita y contrata"].map((t) => (
              <Card key={t} className="ui-card-hover">
                <h3 className="ui-h3">{t}</h3>
                <p className="ui-subtitle mt-2">Cliente: publica necesidad. Profesional: responde y gestiona estado.</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="ui-section">
        <Container>
          <SectionHeader title="Testimonios" subtitle="Confianza real de ambos lados del marketplace." />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {["Laura", "Miguel", "Sofía"].map((n) => (
              <Card key={n} className="ui-card-hover">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--surface-2)" }}>{n[0]}</div>
                  <div><p className="text-sm font-semibold">{n}</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>★★★★★</p></div>
                </div>
                <p className="ui-subtitle mt-3">“UI clara, profesionales de calidad y tiempos de respuesta excelentes.”</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
