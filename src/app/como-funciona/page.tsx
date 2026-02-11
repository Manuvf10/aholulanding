export default function ComoFuncionaPage() {
  return (
    <main className="container-custom py-10">
      <h1 className="section-title">Cómo funciona</h1>
      <p className="section-subtitle">Proceso simple y transparente para clientes y profesionales.</p>
      <ol className="mt-6 space-y-3">
        <li className="card"><span className="badge">Paso 1</span><p className="mt-2 text-sm"><strong>Busca</strong> por ciudad o CP, categoría y radio.</p></li>
        <li className="card"><span className="badge">Paso 2</span><p className="mt-2 text-sm"><strong>Compara</strong> perfiles, precios desde y valoraciones.</p></li>
        <li className="card"><span className="badge">Paso 3</span><p className="mt-2 text-sm"><strong>Solicita</strong> presupuesto y gestiona el estado desde tu panel.</p></li>
      </ol>
    </main>
  );
}
