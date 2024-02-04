import { tryParseInt } from 'cookbook-shared/helpers';
import express, { Express, json } from 'express';
import { MongoClient } from 'mongodb';
import * as api from '~api';
import env from '~env';
import { errorHandler } from '~helpers/error-handler';
import { aborter, enricher, logger } from '~middleware';
import { ResponseError } from '~models';

async function createApp(port: number, signal?: AbortSignal) {
  const app = express();
  app.response.sendError = function (error: ResponseError) {
    errorHandler(error, this);
    return this;
  };

  return new Promise<Express>((resolve, reject) => {
    if (signal?.aborted) {
      reject();
    }

    const server = app.listen(port, () => {
      resolve(app);
    });
    server.on('close', () => reject());
    signal?.addEventListener('abort', () => server.close());
  });
}

async function createMongoClient(signal?: AbortSignal) {
  const client = new MongoClient(env.DB_CONN_STRING);
  signal?.addEventListener('abort', () => {
    client.close();
  });
  await client.connect();
  return client;
}

export async function run(signal?: AbortSignal) {
  // Connect to our database
  const client = await createMongoClient(signal);
  const db = client.db(env.DB_NAME);

  // Create the express server
  const tryParsePort = tryParseInt(env.PORT);
  const port = tryParsePort.success ? tryParsePort.value : 8000;
  const app = await createApp(port, signal);
  console.log(`Server is listening at http://localhost:${port}`);

  // Register middleware
  const middleware = [json(), enricher, logger, aborter];
  app.use(middleware);
  console.log('Registered middleware:', middleware.map((f) => f.name).join(' > '));

  // Register our API routes to connect to the DB
  const registered: string[] = [];
  for (const method of Object.values(api)) {
    if ('isEndpoint' in method && method.isEndpoint === true) {
      registered.push(method.name);
      method(app, db);
    }
  }
  console.log('Registered endpoints:', registered.join(', '));

  return new Promise<void>((resolve) => {
    signal?.addEventListener('abort', () => resolve());
  });
}
