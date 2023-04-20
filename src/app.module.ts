import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';

import { ActionsModule } from './actions/actions.module';
import { AdminModule } from './admin/admin.module';
import { AreasModule } from './areas/areas.module';
import { AuthModule } from './auth/auth.module';
import { env } from './common/env';
import { AppMiddleware } from './common/middlewares/app.middleware';
import { DatabaseModule } from './database/database.module';
import { GoalsModule } from './goals/goals.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true, // We handle that on our own inside the environment-variables.ts file
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3000),
        BASE_URL: Joi.string().required(),
        POSTGRESQL_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        SMTP_TRANSPORT_URL: Joi.string().required(),
        SMTP_FROM: Joi.string().required(),
      }),
      load: [() => env],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'trace',
        transport:
          env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  minimumLevel: 'trace',
                  colorize: true,
                },
              }
            : undefined,
      },
    }),
    DatabaseModule,
    NotificationsModule,
    AreasModule,
    GoalsModule,
    ActionsModule,
    AuthModule,
    SettingsModule,
    UsersModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
