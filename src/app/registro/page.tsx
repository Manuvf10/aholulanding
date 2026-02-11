import { Container } from "@/components/ui/Container";
import RegistroForm from "./registro-form";

export default async function RegistroPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = params.role === "PROFESIONAL" ? "PROFESIONAL" : "CLIENTE";

  return (
    <main className="ui-section">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border lg:grid-cols-2" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <section className="hidden p-8 lg:block" style={{ background: "linear-gradient(155deg,#f5e7d9,#fdf6ef)" }}>
            <h1 className="ui-h2">Únete a todoslosoficios</h1>
            <p className="ui-subtitle">Crea tu cuenta y empieza a conectar con oportunidades reales.</p>
          </section>
          <div className="p-6 sm:p-8">
            <h2 className="ui-h3">Registro {role === "CLIENTE" ? "de cliente" : "profesional"}</h2>
            <RegistroForm role={role} />
          </div>
        </div>
      </Container>
    </main>
  );
}
