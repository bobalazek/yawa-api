import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { API_HEADER_X_AUTHORIZATION } from '../../auth/auth.constants';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { UserDto } from '../../users/dtos/user.dto';
import { UsersService } from '../../users/services/users.service';

@ApiTags('Admin (API v1) Users')
@Controller('/api/v1/admin/users')
export class AdminUsersController {
  constructor(private readonly _usersService: UsersService) {}

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AdminGuard)
  @Get()
  async viewAll(): Promise<UserDto[]> {
    const users = await this._usersService.findAll();

    return users.map((user) => {
      return plainToClass(UserDto, user);
    });
  }
}
