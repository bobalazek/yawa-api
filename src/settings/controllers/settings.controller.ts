import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { API_HEADER_X_AUTHORIZATION } from 'src/auth/auth.constants';

import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { AuthService } from '../../auth/services/auth.service';
import { ChangePasswordSettingsDto } from '../dtos/change-password-settings.dto';
import { ProfileSettingsDto } from '../dtos/profile-settings.dto';

@ApiTags('Settings (API v1)')
@Controller('/api/v1/settings')
export class SettingsController {
  constructor(private readonly _authService: AuthService) {}

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post('/profile')
  async profile(@Body() profileSettingsDto: ProfileSettingsDto, @Req() req: Request): Promise<{ message: string }> {
    await this._authService.updateUser(req.user, profileSettingsDto);

    return { message: 'User profile successfully updated' };
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post('/change-password')
  async changePassword(
    @Body() changePasswordSettingsDto: ChangePasswordSettingsDto,
    @Req() req: Request
  ): Promise<{ message: string }> {
    await this._authService.changePassword(req.user, changePasswordSettingsDto);

    return { message: 'Password successfully changed' };
  }
}
