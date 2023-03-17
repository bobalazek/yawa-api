import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IS_PRODUCTION, POSTGRESQL_URL } from '../app/app.constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: POSTGRESQL_URL,
      autoLoadEntities: true,
      synchronize: !IS_PRODUCTION,
    }),
  ],
})
export class DatabaseModule {}
