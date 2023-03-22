import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import environmentVariables from './environment-variables';

// Used only for typeorm migrations
// Brilliant job NestJS with not being able to natively integrate typeorm migrations!

config();

export default new DataSource({
  type: 'postgres',
  url: environmentVariables().POSTGRESQL_URL,
  entities: ['**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
});
