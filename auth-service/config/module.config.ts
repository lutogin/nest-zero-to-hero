import * as dotEnv from 'dotenv';

dotEnv.config();

const {
  DATABASE_URL,
  SALT,
  SECRET,
  PORT,
} = process.env;

export {
  DATABASE_URL,
  SALT,
  SECRET,
  PORT,
}
