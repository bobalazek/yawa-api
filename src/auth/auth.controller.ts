import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Req() req: Request) {
    // TODO: register DTO

    return null;
  }

  @Post('request-reset-password')
  async resetPasswordRequest(@Req() req: Request) {
    // TODO: reset password request DTO

    return null;
  }

  @Post('reset-password')
  async resetPassword(@Req() req: Request) {
    // TODO: reset password DTO

    return null;
  }
}
