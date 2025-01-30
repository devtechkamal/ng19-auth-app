// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

interface ErrorResponse {
  status: number;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response: ErrorResponse = {
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  };

  if (err instanceof ZodError) {
    response.status = 400;
    response.message = "Validation Error";
    response.errors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  }

  res.status(response.status).json(response);
};
