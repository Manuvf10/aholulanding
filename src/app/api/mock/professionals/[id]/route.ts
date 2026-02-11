import { NextResponse } from "next/server";
import { professionals } from "@/data/professionals";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = professionals.find((p) => p.id === id);
  if (!found) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(found);
}
