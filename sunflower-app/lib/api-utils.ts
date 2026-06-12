// Utility function to handle API responses and validation errors
import { NextResponse } from 'next/server';

export interface ApiErrorResponse {
  error: string;
  details?: Record<string, string[]>;
}

export interface ApiSuccessResponse<T> {
  data: T;
  success: true;
}

export function sendError(
  message: string,
  status: number = 400,
  details?: Record<string, string[]>
) {
  const response: ApiErrorResponse = {
    error: message,
    ...(details && { details }),
  };
  return NextResponse.json(response, { status });
}

export function sendSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

export function sendCreated<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}

export function validateRequestBody(data: unknown, validator: any) {
  const result = validator(data);
  if (!result.success) {
    const details: Record<string, string[]> = {};
    result.error.errors.forEach((error: any) => {
      const path = error.path.join('.');
      if (!details[path]) {
        details[path] = [];
      }
      details[path].push(error.message);
    });
    return {
      valid: false,
      errors: details,
    };
  }
  return {
    valid: true,
    data: result.data,
  };
}
