import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenerateSeedsCommand } from './commands/generate-seeds.command';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('POSTGRESQL_URL'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') !== 'prod',
      }),
    }),
  ],
  providers: [GenerateSeedsCommand],
})
export class DatabaseModule {}
