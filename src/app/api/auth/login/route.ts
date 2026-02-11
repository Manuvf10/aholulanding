import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-db";
import { SESSION_KEY } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const user = mockUsers.find((u) => u.email === body.email && u.password === body.password);
  if (!user) return NextResponse.json({ error: "Invalid" }, { status: 401 });

  const res = NextResponse.json({ role: user.role });
  res.cookies.set(SESSION_KEY, user.email, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
