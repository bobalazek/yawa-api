import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { UserDto } from '../../users/dtos/user.dto';
import { SettingsDto } from '../dtos/settings.dto';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Account (API v1)')
@Controller('/api/v1/account')
export class AccountController {
  constructor(private readonly _authService: AuthService) {}

  @ApiHeader({
    name: 'X-Authorization',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer e737c47f-8ec5-4ddc-b414-d93975ffd297',
    },
  })
  @UseGuards(AuthenticatedGuard)
  @Post('/profile')
  async profile(@Req() req: Request): Promise<UserDto> {
    const user = await this._authService.getUserById(req.user.id);

    return plainToClass(UserDto, user);
  }

  @ApiHeader({
    name: 'X-Authorization',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer e737c47f-8ec5-4ddc-b414-d93975ffd297',
    },
  })
  @UseGuards(AuthenticatedGuard)
  @Post('/settings')
  async settings(@Body() settingsDto: SettingsDto, @Req() req: Request): Promise<UserDto> {
    const user = await this._authService.getUserById(req.user.id);
    const updatedUser = await this._authService.updateUser(user, settingsDto);

    return plainToClass(UserDto, updatedUser);
  }
}
