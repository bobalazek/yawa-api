import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// Used only for typeorm migrations
// Brilliant job NestJS with not being able to natively integrate typeorm migrations!

config();

export default new DataSource({
  type: 'postgres',
  url: process.env.POSTGRESQL_URL,
  entities: ['**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
});
