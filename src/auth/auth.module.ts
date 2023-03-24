import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationsModule } from '../notifications/notifications.module';
import { SettingsController } from '../settings/controllers/settings.controller';
import { AuthPagesController } from './controllers/auth-pages.controller';
import { AuthController } from './controllers/auth.controller';
import { UserAccessToken } from './entities/user-access-token.entity';
import { User } from './entities/user.entity';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './services/auth.service';
import { UserAccessTokensService } from './services/user-access-tokens.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccessToken]), NotificationsModule],
  providers: [AuthService, UsersService, UserAccessTokensService],
  controllers: [AuthController, AuthPagesController, SettingsController],
  exports: [AuthService, UsersService, UserAccessTokensService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
