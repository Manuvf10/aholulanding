import Link from "next/link";
import { categoriesList } from "@/data/professionals";

export default function LandingPage() {
  return (
    <main>
      <section className="container-custom py-16">
        <h1 className="text-4xl font-bold">Encuentra profesionales de confianza cerca de ti</h1>
        <p className="mt-4 max-w-2xl text-slate-600">Marketplace para conectar clientes con fontaneros, jardineros, electricistas y más por ciudad o código postal.</p>
        <div className="mt-8 flex gap-3">
          <Link href="/buscar" className="btn-primary">Buscar profesional</Link>
          <Link href="/registro?role=PROFESIONAL" className="btn-secondary">Soy profesional</Link>
        </div>
      </section>

      <section className="container-custom py-10">
        <h2 className="mb-4 text-2xl font-semibold">Categorías destacadas</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {categoriesList.map((c) => <div key={c} className="card text-center font-medium">{c}</div>)}
        </div>
      </section>

      <section className="container-custom py-10">
        <h2 className="mb-4 text-2xl font-semibold">Cómo funciona</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {["Publica tu necesidad", "Recibe propuestas", "Contrata con confianza"].map((s, i) => (
            <div key={s} className="card"><p className="text-sm text-blue-700">Paso {i+1}</p><p className="mt-2 font-medium">{s}</p></div>
          ))}
        </div>
      </section>

      <section className="container-custom py-10 pb-20">
        <h2 className="mb-4 text-2xl font-semibold">Testimonios</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <blockquote className="card">“En 15 minutos encontré electricista para una urgencia.” — Laura, Madrid</blockquote>
          <blockquote className="card">“Empecé a recibir clientes el primer día.” — Carlos, jardinero</blockquote>
        </div>
      </section>
    </main>
  );
}
