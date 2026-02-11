import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-db";

export async function POST(req: Request) {
  const body = await req.json();
  if (mockUsers.some((u) => u.email === body.email)) {
    return NextResponse.json({ error: "Email ya registrado" }, { status: 400 });
  }

  mockUsers.push({
    id: `u${mockUsers.length + 1}`,
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
    city: body.city,
    postalCode: "00000",
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
