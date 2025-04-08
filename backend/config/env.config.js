import path from 'path';
import dotenv from 'dotenv';

const filePath = process.env.NODE_ENV === 'production' ? path.resolve('.env') : path.resolve('../.env');
dotenv.config({ path: filePath });

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.SERVER_PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_PORT: process.env.CLIENT_PORT || 3000,
  CLIENT_HOST: process.env.CLIENT_HOST || 'localhost',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  JWT_SECRET: process.env.JWT_SECRET,

  TMDB_API_KEY: process.env.TMDB_API_KEY,

  MAILTRAP_TOKEN: process.env.MAILTRAP_API_TOKEN,
  MAILTRAP_ENDPOINT: process.env.MAILTRAP_ENDPOINT,
};
