export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  BASE_URL: process.env.BASE_URL,
  POSTGRESQL_URL: process.env.POSTGRESQL_URL,
  REDIS_URL: process.env.REDIS_URL,
  SMTP_TRANSPORT_URL: process.env.SMTP_TRANSPORT_URL,
  SMTP_FROM: process.env.SMTP_FROM,
});
