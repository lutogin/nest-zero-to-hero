import * as dotEnv from 'dotenv';

dotEnv.config();

const {
  AUTH_SERVICE_HOST,
  AUTH_SERVICE_PORT,
  PORT,
} = process.env;

export {
  AUTH_SERVICE_PORT,
  AUTH_SERVICE_HOST,
  PORT
}
