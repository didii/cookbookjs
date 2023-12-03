import { NextFunction, Request, Response } from 'express';

interface Middleware {
  (req: Request, res: Response, next: NextFunction): void;
  isMiddleware: true;
}

export function createMiddleware(middleware: (req: Request, res: Response, next: NextFunction) => void) {
  const result = middleware as Middleware;
  result.isMiddleware = true;
  return result;
}
