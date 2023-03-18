import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAccessToken } from './entities/user-access-token.entity';
import { User } from './entities/user.entity';
import { UserAccessTokensService } from './services/user-access-tokens.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccessToken])],
  providers: [UsersService, UserAccessTokensService],
  exports: [TypeOrmModule, UsersService, UserAccessTokensService],
})
export class UsersModule {}
