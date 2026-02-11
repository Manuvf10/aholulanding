export default function ComoFuncionaPage() {
  return (
    <main className="container-custom py-10">
      <h1 className="section-title">Cómo funciona</h1>
      <p className="section-subtitle">Un proceso intuitivo para contratar con confianza en menos tiempo.</p>
      <ol className="mt-7 grid gap-4 md:grid-cols-3">
        <li className="card card-hover"><span className="badge">Paso 1</span><p className="mt-3 text-lg font-semibold">Busca por zona</p><p className="mt-2 text-sm text-[var(--muted)]">Selecciona ciudad o CP, distancia y categoría.</p></li>
        <li className="card card-hover"><span className="badge">Paso 2</span><p className="mt-3 text-lg font-semibold">Compara opciones</p><p className="mt-2 text-sm text-[var(--muted)]">Mira precio desde, reputación y experiencia.</p></li>
        <li className="card card-hover"><span className="badge">Paso 3</span><p className="mt-3 text-lg font-semibold">Solicita y decide</p><p className="mt-2 text-sm text-[var(--muted)]">Envía tu necesidad y gestiona respuestas.</p></li>
      </ol>
    </main>
  );
}
