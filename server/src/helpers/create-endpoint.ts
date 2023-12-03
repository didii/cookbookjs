import { Express } from 'express';
import { Db } from 'mongodb';

export interface Endpoint {
  (app: Express, db: Db): void;
  isEndpoint: true;
}

export function createEndpoint(action: (app: Express, db: Db) => void): Endpoint {
  const result = action as Endpoint;
  result.isEndpoint = true;
  return result;
}
