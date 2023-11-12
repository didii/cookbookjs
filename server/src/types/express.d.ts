declare module 'express-serve-static-core' {
  interface Request {
    signal?: AbortSignal;
  }
}

// Empty export since this must be a module file
export {};
