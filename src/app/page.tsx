import Link from "next/link";
import { categoriesList } from "@/data/professionals";

const categoryIcons: Record<string, string> = {
  Fontanería: "🚰",
  Electricidad: "⚡",
  Jardinería: "🌿",
  Pintura: "🎨",
  Limpieza: "🧼",
};

const features = [
  { title: "Calidad verificada", text: "Perfiles con reseñas reales, insignias y reputación visible.", icon: "⭐" },
  { title: "Experiencia rápida", text: "Busca, compara y solicita en pocos pasos sin fricción.", icon: "⚡" },
  { title: "Control total", text: "Gestiona presupuestos y respuestas desde un solo panel.", icon: "🧭" },
];

export default function LandingPage() {
  return (
    <main>
      <section className="container-custom py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="badge">Marketplace local · Diseño startup</span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Encuentra al profesional perfecto <span className="text-[var(--primary)]">cerca de ti</span>
            </h1>
            <p className="section-subtitle">
              todoslosoficios conecta clientes con profesionales de confianza: compara precio, rating,
              distancia y elige con seguridad.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/buscar" className="btn-primary">Buscar profesional</Link>
              <Link href="/registro?role=PROFESIONAL" className="btn-secondary">Soy profesional</Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="kpi"><p className="text-2xl font-semibold">+3.200</p><p className="text-xs text-[var(--muted)]">Solicitudes/mes</p></div>
              <div className="kpi"><p className="text-2xl font-semibold">4.8/5</p><p className="text-xs text-[var(--muted)]">Media de reseñas</p></div>
              <div className="kpi col-span-2 sm:col-span-1"><p className="text-2xl font-semibold">24h</p><p className="text-xs text-[var(--muted)]">Respuesta promedio</p></div>
            </div>
          </div>

          <div className="card card-hover p-6 sm:p-8">
            <p className="text-sm font-semibold text-[var(--muted)]">Categorías más buscadas</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {categoriesList.map((c) => (
                <div key={c} className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
                  <p className="text-lg">{categoryIcons[c] ?? "🛠️"}</p>
                  <p className="mt-1 text-sm font-semibold">{c}</p>
                </div>
              ))}
            </div>
            <Link href="/buscar" className="btn-primary mt-5 w-full">Comenzar búsqueda</Link>
          </div>
        </div>
      </section>

      <section className="container-custom py-10">
        <h2 className="section-title">Una experiencia profesional y clara</h2>
        <p className="section-subtitle">Pensado para decidir rápido con máxima confianza.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="card card-hover">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-custom py-10">
        <h2 className="section-title">Cómo funciona</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            ["1", "Busca por zona", "Filtra por ciudad o CP, categoría y radio."],
            ["2", "Compara perfiles", "Revisa valoraciones, precios y badges de confianza."],
            ["3", "Solicita presupuesto", "Envía tu necesidad y haz seguimiento desde tu panel."],
          ].map(([step, title, text]) => (
            <article key={step} className="card card-hover">
              <span className="badge">Paso {step}</span>
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-custom py-10">
        <h2 className="section-title">Testimonios</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            ["“En minutos encontré un electricista excelente.”", "Laura · Madrid"],
            ["“La plataforma es limpia y profesional, todo claro.”", "Miguel · Valencia"],
            ["“Como profesional, recibo solicitudes de calidad.”", "Carlos · Jardinería"],
          ].map(([quote, author]) => (
            <blockquote key={author} className="card card-hover">
              <p className="text-sm text-[var(--muted)]">{quote}</p>
              <footer className="mt-4 text-sm font-semibold">{author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="container-custom pb-20 pt-8">
        <div className="card p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">¿Listo para contratar con confianza?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--muted)]">Empieza ahora y encuentra profesionales verificados para cualquier necesidad del hogar o negocio.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/buscar" className="btn-primary">Buscar profesional</Link>
            <Link href="/registro?role=PROFESIONAL" className="btn-secondary">Quiero ofrecer servicios</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
