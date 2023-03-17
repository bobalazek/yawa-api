import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
    return this._authService.registerUser(registerDto);
  }

  @Post('request-reset-password')
  async requestResetPassword(@Req() req: Request) {
    // TODO: reset password request DTO

    return null;
  }

  @Post('reset-password')
  async resetPassword(@Req() req: Request) {
    // TODO: reset password DTO

    return null;
  }
}
