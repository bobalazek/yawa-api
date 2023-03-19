import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { QueuesModule } from './queues/queues.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3000),
        BASE_URL: Joi.string().required(),
        POSTGRESQL_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        SMTP_TRANSPORT_URL: Joi.string().required(),
        SMTP_FROM: Joi.string().required(),
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    LoggerModule.forRoot(),
    DatabaseModule,
    MailModule,
    QueuesModule,
    CommonModule,
    AuthModule,
    UsersModule,
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
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
