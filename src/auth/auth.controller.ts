import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/register')
  async register(@Req() req: Request) {
    // TODO

    return null;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/request-reset-password')
  async resetPasswordRequest(@Req() req: Request) {
    // TODO

    return null;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/reset-password')
  async resetPassword(@Req() req: Request) {
    // TODO

    return null;
  }
}
