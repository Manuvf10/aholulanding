import RegistroForm from "./registro-form";

export default async function RegistroPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = params.role === "PROFESIONAL" ? "PROFESIONAL" : "CLIENTE";

  return (
    <main className="container-custom py-12">
      <span className="badge">Alta en plataforma</span>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Registro {role === "CLIENTE" ? "de cliente" : "profesional"}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Completa tus datos para empezar a usar todoslosoficios con una experiencia moderna y segura.</p>
      <RegistroForm role={role} />
    </main>
  );
}
