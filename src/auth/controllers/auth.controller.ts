import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { UserDto } from '../../users/dtos/user.dto';
import { ConfirmEmailDto } from '../dtos/confirm-email.dto';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request): Promise<UserDto> {
    return plainToClass(UserDto, req.user);
  }

  @Post('logout')
  async logout(@Req() req: Request): Promise<{ message: string }> {
    req.session.destroy(() => {
      // Nothing to do
    });
    return { message: 'User successfully logged out' };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    const createdUser = await this._authService.registerUser(registerDto);
    return plainToClass(UserDto, createdUser);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('confirm-email')
  async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto, @Req() req: Request): Promise<{ message: string }> {
    await this._authService.confirmUserEmail((req.user as UserDto).id, confirmEmailDto.code);
    return { message: 'Email successfully confirmed' };
  }

  /*
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
  */
}
