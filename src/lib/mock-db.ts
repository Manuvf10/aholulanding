import { MockUser, ServiceRequest } from "@/types";
import { professionals } from "@/data/professionals";

export const mockUsers: MockUser[] = [
  { id: "u1", name: "Cliente Demo", email: "cliente@demo.com", password: "123456", role: "CLIENTE", city: "Madrid", postalCode: "28001" },
  { id: "u2", name: "Profesional Demo", email: "pro@demo.com", password: "123456", role: "PROFESIONAL", city: "Madrid", postalCode: "28001", professionalId: professionals[0].id },
];

export const serviceRequests: ServiceRequest[] = [
  { id: "req-1", professionalId: professionals[0].id, professionalName: professionals[0].name, clientEmail: "cliente@demo.com", message: "Necesito arreglar una fuga", preferredDate: "2026-03-01", status: "enviado" },
];
