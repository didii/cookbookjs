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
  // Create the express server
  const port = 8000;
  const app = await createApp(port);
  console.log(`Server is listening at http://localhost:${port}`);

  // Connect to our database
  const client = await createMongoClient();
  console.log(`Connected to DB at ${env.DB_CONN_STRING}`);
  const db = client.db(env.DB_NAME);

  // Register our API routes to connect to the DB
  for (const method of Object.values(api)) {
    method(app, db);
  }
}


main()
  .catch(err => console.error(err));
