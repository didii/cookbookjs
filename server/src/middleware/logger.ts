import { createMiddleware } from '~helpers/create-middleware';

export const logger = createMiddleware(function logger(req, res, next) {
  const startDate = new Date();
  console.log(`[${req.correlationId}] [${startDate.toISOString()}] ${req.method} ${req.url}`);
  next();
  const endDate = new Date();
  console.log(`[${req.correlationId}] [${endDate.toISOString()}] ${req.method} ${req.url}: ${res.statusCode}`);
});
