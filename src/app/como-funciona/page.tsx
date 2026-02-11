import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ComoFuncionaPage() {
  return (
    <main className="ui-section">
      <Container>
        <SectionHeader title="Cómo funciona" subtitle="Tres pasos para contratar mejor y más rápido." />
        <ol className="mt-7 grid gap-4 md:grid-cols-3">
          <Card className="ui-card-hover"><Badge>Paso 1</Badge><h3 className="ui-h3 mt-3">Busca por zona</h3><p className="ui-subtitle">Elige ciudad, categoría y distancia.</p></Card>
          <Card className="ui-card-hover"><Badge>Paso 2</Badge><h3 className="ui-h3 mt-3">Compara profesionales</h3><p className="ui-subtitle">Mira ratings, precio y experiencia.</p></Card>
          <Card className="ui-card-hover"><Badge>Paso 3</Badge><h3 className="ui-h3 mt-3">Solicita presupuesto</h3><p className="ui-subtitle">Envía tu necesidad y gestiona respuestas.</p></Card>
        </ol>
      </Container>
    </main>
  );
}
