import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MeasurementSystemConstraint } from '../common/constraints/measurement-system.constraint';
import { PasswordConstraint } from '../common/constraints/password.constraint';
import { TimezoneConstraint } from '../common/constraints/timezone.constraint';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { EmailExistsConstraint } from './constraints/email-exists.constraint';
import { AuthPagesController } from './controllers/auth-pages.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './services/auth.service';

@Module({
  imports: [NotificationsModule, UsersModule],
  providers: [AuthService, EmailExistsConstraint, MeasurementSystemConstraint, PasswordConstraint, TimezoneConstraint],
  controllers: [AuthController, AuthPagesController],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
