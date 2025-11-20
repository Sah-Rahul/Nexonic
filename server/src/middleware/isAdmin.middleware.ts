import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/Auth.interface";
import { ApiError } from "../utils/ApiError";

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  if (user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  next();
};
