export class ApiError extends Error {
  statusCode: number;
  data: any;
  errors: any;
  success: boolean;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: any = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    this.success = statusCode < 400;
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
