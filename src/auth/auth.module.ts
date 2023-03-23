import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { AccountController } from './controllers/account.controller';
import { AuthPagesController } from './controllers/auth-pages.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './services/auth.service';

@Module({
  imports: [NotificationsModule, UsersModule],
  providers: [AuthService],
  controllers: [AuthController, AuthPagesController, AccountController],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
