import { Container } from "@/components/ui/Container";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import RegistroForm from "./registro-form";

export default async function RegistroPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = params.role === "PROFESIONAL" ? "PROFESIONAL" : "CLIENTE";

  return (
    <main className="ui-section">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="ui-app-hero relative overflow-hidden p-8">
            <BackgroundFX />
            <div className="relative z-10">
              <p className="ui-badge">Onboarding premium</p>
              <h1 className="ui-h2 mt-4">Crea tu cuenta como {role === "CLIENTE" ? "Cliente" : "Profesional"}</h1>
              <p className="ui-subtitle">Completa tu perfil y empieza a usar todoslosoficios con una experiencia moderna y enfocada.</p>
            </div>
          </section>
          <div className="ui-panel rounded-2xl p-6 sm:p-8">
            <h2 className="ui-h3">Registro {role === "CLIENTE" ? "de cliente" : "profesional"}</h2>
            <RegistroForm role={role} />
          </div>
        </div>
      </Container>
    </main>
  );
}
