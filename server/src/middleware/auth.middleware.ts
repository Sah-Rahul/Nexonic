import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/Auth.interface";

export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: string;
    };
    req.user = { id: decoded.id };
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
