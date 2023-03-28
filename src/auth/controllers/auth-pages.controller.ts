import { Controller, Get, Query, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

@ApiTags('Auth (Pages)')
@Controller('/auth')
export class AuthPagesController {
  constructor(private readonly _authService: AuthService) {}

  @Render('auth-confirm-email')
  @Get('/confirm-email')
  async confirmEmail(@Query('token') token: string): Promise<{ message?: string; error?: string }> {
    try {
      await this._authService.confirmUserEmail(token);

      return { message: 'Email successfully confirmed' };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  @Render('auth-confirm-new-email')
  @Get('/confirm-new-email')
  async confirmNewEmail(@Query('token') token: string): Promise<{ message?: string; error?: string }> {
    try {
      await this._authService.confirmUserEmail(token, true);

      return { message: 'New email successfully confirmed' };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  @Render('auth-password-reset')
  @Get('/password-reset')
  async passwordReset(@Query('token') token?: string): Promise<{ token: string }> {
    return { token };
  }
}
