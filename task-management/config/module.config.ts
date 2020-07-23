import * as dotEnv from 'dotenv';

dotEnv.config();

const {
  DATABASE_URL,
  AUTH_SERVICE,
  HOST,
  PORT,
} = process.env;

export {
  DATABASE_URL,
  AUTH_SERVICE,
  HOST,
  PORT,
}
