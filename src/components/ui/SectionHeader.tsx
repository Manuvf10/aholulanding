export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header>
      <h2 className="ui-h2">{title}</h2>
      {subtitle && <p className="ui-subtitle">{subtitle}</p>}
    </header>
  );
}
