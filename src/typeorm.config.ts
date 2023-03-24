import { DataSource } from 'typeorm';

import { env } from './common/env';

// Used only for typeorm migrations
// Brilliant job NestJS with not being able to natively integrate typeorm migrations!

export default new DataSource({
  type: 'postgres',
  url: env.POSTGRESQL_URL,
  entities: ['**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
});
