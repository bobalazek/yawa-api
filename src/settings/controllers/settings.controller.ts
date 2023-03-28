import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { API_HEADER_X_AUTHORIZATION } from '../../auth/auth.constants';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { ChangePasswordSettingsDto } from '../dtos/change-password-settings.dto';
import { ProfileSettingsDto } from '../dtos/profile-settings.dto';
import { SettingsService } from '../services/settings.service';

@ApiTags('Settings (API v1)')
@Controller('/api/v1/settings')
export class SettingsController {
  constructor(private readonly _settingsService: SettingsService) {}

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post('/update-profile')
  async updateProfile(
    @Body() profileSettingsDto: ProfileSettingsDto,
    @Req() req: Request
  ): Promise<{ message: string }> {
    await this._settingsService.updateUser(req.user, profileSettingsDto);

    return { message: 'User profile successfully updated' };
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post('/change-password')
  async changePassword(
    @Body() changePasswordSettingsDto: ChangePasswordSettingsDto,
    @Req() req: Request
  ): Promise<{ message: string }> {
    await this._settingsService.changePassword(req.user, changePasswordSettingsDto);

    return { message: 'Password successfully changed' };
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post('/resend-new-email-confirmation-email')
  async resendNewEmailConfirmationEmail(@Req() req: Request): Promise<{ message: string }> {
    await this._settingsService.resendNewEmailConfirmationEmail(req.user);

    return { message: 'New email confirmation email successfully sent' };
  }
}
