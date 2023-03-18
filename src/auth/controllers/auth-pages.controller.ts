import { Controller, Get, Query, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

@ApiTags('Auth Pages')
@Controller('/auth')
export class AuthPagesController {
  constructor(private readonly _authService: AuthService) {}

  @Render('auth-confirm-email')
  @Get('/confirm-email')
  async confirmEmailGet(@Query('token') token: string) {
    try {
      await this._authService.confirmUserEmailByToken(token);

      return { message: 'Email successfully confirmed' };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  @Render('auth-confirm-new-email')
  @Get('/confirm-new-email')
  async confirmNewEmailGet(@Query('token') token: string) {
    await this._authService.confirmUserEmailByToken(token, true);

    return { message: 'New email successfully confirmed' };
  }
}
