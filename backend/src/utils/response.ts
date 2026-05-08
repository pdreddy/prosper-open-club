import { Response } from 'express';

interface SuccessResponse<TData> {
  success: true;
  message: string;
  data: TData;
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}

export const sendSuccess = <TData>(
  response: Response,
  statusCode: number,
  message: string,
  data: TData,
): Response<SuccessResponse<TData>> => {
  return response.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  response: Response,
  statusCode: number,
  message: string,
  errors?: unknown,
): Response<ErrorResponse> => {
  return response.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
