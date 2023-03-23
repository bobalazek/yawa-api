import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { AuthPagesController } from './controllers/auth-pages.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './services/auth.service';

@Module({
  imports: [MailModule, UsersModule],
  providers: [AuthService],
  controllers: [AuthController, AuthPagesController],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
