import RegistroForm from "./registro-form";

export default async function RegistroPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = params.role === "PROFESIONAL" ? "PROFESIONAL" : "CLIENTE";

  return (
    <main className="container-custom py-12">
      <p className="badge inline-block">Alta de usuarios</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Registro {role === "CLIENTE" ? "de cliente" : "profesional"}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Completa tus datos para empezar a usar todoslosoficios.</p>
      <RegistroForm role={role} />
    </main>
  );
}
