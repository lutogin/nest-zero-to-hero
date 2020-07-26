import * as dotEnv from 'dotenv';

dotEnv.config();

const {
  AUTH_SERVICE_HOST,
  AUTH_SERVICE_PORT,
  AUTH_SERVICE_URL,
  TASK_MANAGEMENT_HOST,
  TASK_MANAGEMENT_PORT,
  TASK_MANAGEMENT_URL,
  PORT,
} = process.env;

export {
  AUTH_SERVICE_PORT,
  AUTH_SERVICE_HOST,
  AUTH_SERVICE_URL,
  TASK_MANAGEMENT_HOST,
  TASK_MANAGEMENT_PORT,
  TASK_MANAGEMENT_URL,
  PORT
}
