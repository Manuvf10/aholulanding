export type Role = "CLIENTE" | "PROFESIONAL";

export type Category = "Fontanería" | "Electricidad" | "Jardinería" | "Pintura" | "Limpieza";

export type Availability = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado";

export interface Review {
  id: string;
  author: string;
  date: string;
  comment: string;
  rating: number;
}

export interface Professional {
  id: string;
  name: string;
  category: Category;
  city: string;
  postalCode: string;
  basePrice: number;
  description: string;
  rating: number;
  reviewsCount: number;
  badges: string[];
  photo: string;
  services: string[];
  workZones: string[];
  reviews: Review[];
  verified: boolean;
  emergencies: boolean;
}

export interface ServiceRequest {
  id: string;
  professionalId: string;
  professionalName: string;
  clientEmail: string;
  message: string;
  preferredDate: string;
  status: "enviado" | "aceptado" | "rechazado";
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  city: string;
  postalCode: string;
  professionalId?: string;
}
