import Link from "next/link";
import { categoriesList } from "@/data/professionals";

const features = [
  { title: "Profesionales verificados", text: "Perfiles con valoraciones reales, badges y tiempos de respuesta.", icon: "✅" },
  { title: "Filtros inteligentes", text: "Encuentra por ciudad/CP, distancia, categoría y precio en segundos.", icon: "🎯" },
  { title: "Presupuestos rápidos", text: "Envía tu solicitud desde la ficha y gestiona todo desde el panel.", icon: "⚡" },
];

export default function LandingPage() {
  return (
    <main>
      <section className="container-custom py-14 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="badge inline-block">Marketplace local confiable</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Tu profesional ideal, <span className="text-[var(--primary)]">cerca y sin complicaciones</span>
            </h1>
            <p className="section-subtitle">
              En todoslosoficios conectamos clientes con fontaneros, electricistas, jardineros y más.
              Compara perfiles y solicita presupuesto en menos de 2 minutos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/buscar" className="btn-primary">Buscar profesional</Link>
              <Link href="/registro?role=PROFESIONAL" className="btn-secondary">Soy profesional</Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="kpi"><p className="text-2xl font-semibold">+3.2k</p><p className="text-xs text-[var(--muted)]">Solicitudes mensuales</p></div>
              <div className="kpi"><p className="text-2xl font-semibold">4.8/5</p><p className="text-xs text-[var(--muted)]">Valoración media</p></div>
              <div className="kpi col-span-2 sm:col-span-1"><p className="text-2xl font-semibold">24h</p><p className="text-xs text-[var(--muted)]">Respuesta promedio</p></div>
            </div>
          </div>

          <div className="card glass border-none shadow-lg">
            <h2 className="text-lg font-semibold">¿Qué necesitas hoy?</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Explora categorías populares y encuentra ayuda inmediata.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {categoriesList.map((c) => (
                <div key={c} className="rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-sm font-medium">
                  {c}
                </div>
              ))}
            </div>
            <Link href="/buscar" className="btn-primary mt-5 w-full">Empezar ahora</Link>
          </div>
        </div>
      </section>

      <section className="container-custom pb-8">
        <h2 className="section-title">Diseñado para una experiencia moderna</h2>
        <p className="section-subtitle">Todo optimizado para decidir más rápido con mejor contexto.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="card">
              <p className="text-2xl">{f.icon}</p>
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-custom py-10">
        <h2 className="section-title">Cómo funciona</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["1", "Busca y filtra", "Elige ciudad o CP, define distancia y categoría."],
            ["2", "Compara perfiles", "Revisa precio desde, ratings y reseñas verificadas."],
            ["3", "Solicita presupuesto", "Describe tu necesidad y recibe respuesta rápida."],
          ].map(([step, title, text]) => (
            <div key={step} className="card">
              <span className="badge">Paso {step}</span>
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom py-12">
        <h2 className="section-title">Clientes felices y profesionales activos</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <blockquote className="card">
            <p className="text-sm text-[var(--muted)]">“Tenía una urgencia eléctrica y en minutos encontré un técnico excelente. Fluido y claro.”</p>
            <footer className="mt-3 text-sm font-semibold">Laura · Madrid</footer>
          </blockquote>
          <blockquote className="card">
            <p className="text-sm text-[var(--muted)]">“Como profesional me dio visibilidad real. La interfaz es rápida y me ordena el trabajo.”</p>
            <footer className="mt-3 text-sm font-semibold">Carlos · Profesional de jardinería</footer>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
