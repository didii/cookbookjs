import {tryParseInt} from 'cookbook-shared/helpers';
import express, { Express, json } from 'express';
import { MongoClient } from 'mongodb';
import * as api from '~api';
import env from '~env';

async function createApp(port: number) {
  const app = express();

  app.use(json());

  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  return new Promise<Express>((resolve, reject) => {
    app.listen(port, () => {
      resolve(app);
    });
  });
}

async function createMongoClient() {
  const client = new MongoClient(env.DB_CONN_STRING);
  await client.connect();
  return client;
}

async function main() {
  // Connect to our database
  const client = await createMongoClient();
  const db = client.db(env.DB_NAME);

  // Create the express server
  const tryParsePort = tryParseInt(env.PORT);
  const port = tryParsePort.success ? tryParsePort.value : 8000;
  const app = await createApp(port);
  console.log(`Server is listening at http://localhost:${port}`);

  // Logger middleware
  app.use((req, res, next) => {
    const guid = crypto.randomUUID();
    const startDate = new Date();
    console.log(`[${guid}] [${startDate.toISOString()}] ${req.method} ${req.url}`);
    next();
    const endDate = new Date();
    console.log(`[${guid}] [${endDate.toISOString()}] ${req.method} ${req.url}: ${res.statusCode}`);
  });

  app.use((req, res, next) => {
    const aborter = new AbortController();
    req.signal = aborter.signal;
    const handler = () => aborter.abort();
    req.on('close', handler);
    next();
    req.removeListener('close', handler);
  });

  // Register our API routes to connect to the DB
  for (const method of Object.values(api)) {
    method(app, db);
  }
}


main()
  .catch(err => console.error(err));
