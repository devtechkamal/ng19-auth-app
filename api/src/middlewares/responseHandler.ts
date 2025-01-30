import { Request, Response, NextFunction } from 'express';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const success = (res: Response, message: string, data: any = null) => {
  const response: ApiResponse = {
    success: true,
    message,
    data,
  };
  res.json(response);
};

export const error = (
  res: Response,
  message: string,
  error: any = null,
  statusCode: number = 500
) => {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  res.status(statusCode).json(response);
};
