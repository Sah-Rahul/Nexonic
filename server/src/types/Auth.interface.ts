import { Request } from "express";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  profile?: string | null;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
