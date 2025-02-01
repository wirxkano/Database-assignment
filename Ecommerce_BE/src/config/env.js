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
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN,

  MOMO_ACCESS_KEY: process.env.MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY: process.env.MOMO_SECRET_KEY,

  FE_URL: process.env.FE_URL,
  BE_URL: process.env.BE_URL
};
