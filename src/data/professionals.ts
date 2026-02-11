import { Professional } from "@/types";

const cities = [
  ["Madrid", "28001"],
  ["Barcelona", "08001"],
  ["Valencia", "46001"],
  ["Sevilla", "41001"],
  ["Málaga", "29001"],
  ["Bilbao", "48001"],
] as const;

const categories: Professional["category"][] = ["Fontanería", "Electricidad", "Jardinería", "Pintura", "Limpieza"];

const names = ["Luis", "Marta", "Javier", "Carla", "Sergio", "Elena", "Diego", "Nuria", "Iván", "Patricia"];

export const professionals: Professional[] = Array.from({ length: 30 }, (_, i) => {
  const cityRef = cities[i % cities.length];
  const category = categories[i % categories.length];
  const name = `${names[i % names.length]} ${String.fromCharCode(65 + (i % 20))}.`;
  const rating = Number((3.9 + (i % 12) * 0.1).toFixed(1));
  return {
    id: `pro-${i + 1}`,
    name,
    category,
    city: cityRef[0],
    postalCode: cityRef[1],
    basePrice: 30 + (i % 8) * 8,
    description: `${name} ofrece servicios de ${category.toLowerCase()} con atención rápida y garantía de trabajo.`,
    rating,
    reviewsCount: 18 + i * 3,
    badges: [i % 2 === 0 ? "Verificado" : "Recomendado", i % 3 === 0 ? "Urgencias" : "Respuesta rápida"],
    photo: `https://i.pravatar.cc/300?img=${(i % 60) + 1}`,
    services: [`Instalación ${category.toLowerCase()}`, "Mantenimiento", "Reparaciones"],
    workZones: [cityRef[0], "Área metropolitana"],
    verified: i % 2 === 0,
    emergencies: i % 3 === 0,
    reviews: Array.from({ length: 3 }, (_, r) => ({
      id: `rev-${i + 1}-${r + 1}`,
      author: ["Ana", "Pedro", "Lucía"][r],
      date: `2025-0${r + 4}-1${r}`,
      comment: "Muy profesional, puntual y transparente con el presupuesto.",
      rating: Math.max(3, Math.min(5, rating + (r === 0 ? 0.2 : -0.1))),
    })),
  };
});

export const categoriesList = categories;
export const cityPostalPairs = cities.map(([city, postalCode]) => ({ city, postalCode }));
