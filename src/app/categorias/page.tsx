import { categoriesList } from "@/data/professionals";

export default function CategoriasPage() {
  return <main className="container-custom py-10"><h1 className="text-3xl font-bold">Categorías</h1><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">{categoriesList.map((c)=><div key={c} className="card">{c}</div>)}</div></main>;
}
