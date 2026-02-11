import RegistroForm from "./registro-form";

export default async function RegistroPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = params.role === "PROFESIONAL" ? "PROFESIONAL" : "CLIENTE";
  return (
    <main className="container-custom py-12">
      <h1 className="text-3xl font-bold">Registro {role === "CLIENTE" ? "de cliente" : "profesional"}</h1>
      <RegistroForm role={role} />
    </main>
  );
}
