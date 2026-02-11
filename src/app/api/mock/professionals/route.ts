import { NextRequest, NextResponse } from "next/server";
import { professionals } from "@/data/professionals";
import { simulateDistance } from "@/lib/distance";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") ?? "Madrid";
  const radius = Number(searchParams.get("radius") ?? 25);
  const category = searchParams.get("category");

  const data = professionals
    .map((p) => ({ ...p, distance: simulateDistance(city, p.city) }))
    .filter((p) => p.distance <= radius)
    .filter((p) => !category || p.category === category);

  return NextResponse.json(data);
}
