import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/Auth.interface";
import User from "../models/user.model";

export const isAuthenticated = async (
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

    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    req.user = {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profile: user.profile || null,
    };
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
