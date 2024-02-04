import { ResponseError } from '~models';

declare module 'express-serve-static-core' {
  interface Request {
    correlationId: string;
    timestamp: Date;
    signal: AbortSignal;
  }
  interface Response {
    correlationId: string;
    error?: ResponseError;
    sendError(error: ResponseError): Response;
  }
}

// Empty export since this must be a module file
export {};
