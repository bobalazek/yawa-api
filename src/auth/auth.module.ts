import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';

import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { SessionSerializer } from './serializers/session.serializer';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
