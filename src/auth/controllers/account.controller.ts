import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { UserDto } from '../../users/dtos/user.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { SettingsDto } from '../dtos/settings.dto';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { AuthService } from '../services/auth.service';

const API_HEADER_X_AUTHORIZATION = {
  name: 'X-Authorization',
  required: true,
  schema: {
    type: 'string',
    example: 'Bearer e737c47f-8ec5-4ddc-b414-d93975ffd297',
  },
};

@ApiTags('Account (API v1)')
@Controller('/api/v1/account')
export class AccountController {
  constructor(private readonly _authService: AuthService) {}

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  async profile(@Req() req: Request): Promise<UserDto> {
    const user = await this._authService.getUserById(req.user.id);

    return plainToClass(UserDto, user);
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post('/settings')
  async settings(@Body() settingsDto: SettingsDto, @Req() req: Request): Promise<{ message: string }> {
    await this._authService.updateUser(req.user, settingsDto);

    return { message: 'User settings successfully saved' };
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post('/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request
  ): Promise<{ message: string }> {
    await this._authService.changePassword(req.user, changePasswordDto);

    return { message: 'Password successfully changed' };
  }
}
