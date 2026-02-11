import { NextResponse } from "next/server";
import { serviceRequests } from "@/lib/mock-db";

export async function GET() {
  return NextResponse.json(serviceRequests);
}

export async function POST(req: Request) {
  const body = await req.json();
  const item = {
    id: `req-${serviceRequests.length + 1}`,
    professionalId: body.professionalId,
    professionalName: body.professionalName,
    clientEmail: "cliente@demo.com",
    message: body.message,
    preferredDate: body.preferredDate,
    status: "enviado" as const,
  };
  serviceRequests.unshift(item);
  return NextResponse.json(item, { status: 201 });
}
