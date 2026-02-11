import { categoriesList } from "@/data/professionals";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons: Record<string, string> = {
  Fontanería: "🚰",
  Electricidad: "⚡",
  Jardinería: "🌿",
  Pintura: "🎨",
  Limpieza: "🧼",
};

export default function CategoriasPage() {
  return (
    <main className="ui-section">
      <Container>
        <SectionHeader title="Categorías" subtitle="Explora oficios con profesionales disponibles hoy." />
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {categoriesList.map((c) => (
            <Card key={c} className="ui-card-hover">
              <p className="text-2xl">{icons[c] ?? "🛠️"}</p>
              <p className="mt-2 text-lg font-semibold">{c}</p>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
