import { ZodError } from 'zod';

export type ResponseError = ResponseGenericError | ResponseZodError | ResponseUnknownError | ResponseMongoDbError;

export interface ResponseGenericError {
  type: 'generic';
  errorType: string;
  message: string;
  status: number;
  data?: Record<string, any>;
}

export interface ResponseZodError {
  type: 'zod';
  message: string;
  error: ZodError;
}

export interface ResponseUnknownError {
  type: 'unknown';
  error: unknown;
}

export interface ResponseMongoDbError {
  type: 'mongoDb';
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ResponseError {
  export function create(error: ResponseError) {
    return error;
  }
}
