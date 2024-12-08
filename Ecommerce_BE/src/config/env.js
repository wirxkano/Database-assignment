/* eslint-disable no-undef */
import 'dotenv/config';

export const env = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  BUILD_MODE: process.env.BUILD_MODE,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN
};
