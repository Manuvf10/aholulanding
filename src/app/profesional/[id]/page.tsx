import ProfessionalView from "./professional-view";

export default async function ProfessionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProfessionalView id={id} />;
}
