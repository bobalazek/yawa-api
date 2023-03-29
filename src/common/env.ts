import { config } from 'dotenv';

config();

export const env = {
  APP_NAME: 'YAWA',
  APP_VERSION: '0.1.0',
  NEW_EMAIL_CONFIRMATION_TIMEOUT_SECONDS: 900,
  PASSWORD_RESET_REQUEST_EXPIRATION_SECONDS: 900,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  BASE_URL: process.env.BASE_URL,
  POSTGRESQL_URL: process.env.POSTGRESQL_URL,
  REDIS_URL: process.env.REDIS_URL,
  SMTP_TRANSPORT_URL: process.env.SMTP_TRANSPORT_URL,
  SMTP_FROM: process.env.SMTP_FROM,
};
