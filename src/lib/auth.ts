import { cookies } from "next/headers";
import { mockUsers } from "@/lib/mock-db";

const SESSION_KEY = "mock_session";

export async function getSessionUser() {
  const jar = await cookies();
  const email = jar.get(SESSION_KEY)?.value;
  if (!email) return null;
  return mockUsers.find((u) => u.email === email) ?? null;
}

export async function requireUser() {
  return getSessionUser();
}

export { SESSION_KEY };
