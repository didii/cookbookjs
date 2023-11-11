import * as dotenv from 'dotenv';
dotenv.config();

export default {
  DB_CONN_STRING: process.env.DB_CONN_STRING!,
  DB_NAME: process.env.DB_NAME!,
};
