import { createMiddleware } from '~helpers/create-middleware';

export const aborter = createMiddleware(function aborter(req, res, next) {
  const aborter = new AbortController();
  req.signal = aborter.signal;
  const handler = () => aborter.abort();
  req.on('close', handler);
  next();
  req.removeListener('close', handler);
});
