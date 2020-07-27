import * as dotEnv from 'dotenv';

dotEnv.config();

const {
  AUTH_SERVICE_URL,
  TASK_MANAGEMENT_URL,
  PORT,
} = process.env;

export {
  AUTH_SERVICE_URL,
  TASK_MANAGEMENT_URL,
  PORT
}
