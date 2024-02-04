import { createMiddleware } from '~helpers/create-middleware';

export const enricher = createMiddleware(function enricher(req, res, next) {
  const correlationId = crypto.randomUUID();
  const timestamp = new Date();
  req.correlationId = correlationId;
  res.correlationId = correlationId;
  req.timestamp = timestamp;
  next();
});
