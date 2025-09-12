export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle PostgresDB duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    err = new ErrorHandler(message, 400);
  }

  // Handle invalid JWT
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try again.";
    err = new ErrorHandler(message, 400);
  }

  // Handle expired JWT
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token has expired. Try again.";
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
