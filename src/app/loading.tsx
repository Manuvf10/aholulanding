import { Container } from "@/components/ui/Container";

export default function GlobalLoading() {
  return (
    <main className="ui-section">
      <Container>
        <div className="space-y-4">
          <div className="ui-skeleton h-10 w-64" />
          <div className="ui-skeleton h-28 w-full" />
          <div className="ui-skeleton h-28 w-full" />
          <div className="ui-skeleton h-28 w-full" />
        </div>
      </Container>
    </main>
  );
}
