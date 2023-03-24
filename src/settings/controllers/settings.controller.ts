import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { API_HEADER_X_AUTHORIZATION } from 'src/auth/auth.constants';

import { ChangePasswordDto } from '../../auth/dtos/change-password.dto';
import { SettingsDto } from '../../auth/dtos/settings.dto';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { AuthService } from '../../auth/services/auth.service';

@ApiTags('Settings (API v1)')
@Controller('/api/v1/settings')
export class SettingsController {
  constructor(private readonly _authService: AuthService) {}

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post('/')
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
