export default function GlobalLoading() {
  return (
    <main className="container-custom py-10">
      <div className="space-y-4">
        <div className="skeleton h-10 w-64" />
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-24 w-full" />
      </div>
    </main>
  );
}
