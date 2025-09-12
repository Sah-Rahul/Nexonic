import jwt from "jsonwebtoken";

export const sendToken = (
  user,
  statusCode,
  res,
  message = "Logged in successfully"
) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN || "5d",
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: new Date(
      Date.now() + (process.env.COOKIES_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,  
    token,
  });
};
