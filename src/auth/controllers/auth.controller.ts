import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { UserDto } from '../../users/dtos/user.dto';
import { AccessTokenDto } from '../dtos/access-token.dto';
import { CodeDto } from '../dtos/code.dto';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { SettingsDto } from '../dtos/settings.dto';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth (API v1)')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<AccessTokenDto> {
    const accessToken = await this._authService.login(loginDto);

    return { accessToken };
  }

  @Post('/logout')
  async logout(@Req() req: Request): Promise<{ message: string }> {
    req.session.destroy(() => {
      // Nothing to do
    });

    return { message: 'User successfully logged out' };
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    const createdUser = await this._authService.registerUser(registerDto);

    return plainToClass(UserDto, createdUser);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/confirm-email')
  async confirmEmail(@Body() confirmEmailDto: CodeDto, @Req() req: Request): Promise<{ message: string }> {
    await this._authService.confirmUserEmail((req.user as UserDto).id, confirmEmailDto.code);

    return { message: 'Email successfully confirmed' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/confirm-new-email')
  async confirmNewEmail(@Body() confirmEmailDto: CodeDto, @Req() req: Request): Promise<{ message: string }> {
    await this._authService.confirmUserEmail((req.user as UserDto).id, confirmEmailDto.code, true);

    return { message: 'New email successfully confirmed' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/profile')
  async profile(@Req() req: Request): Promise<UserDto> {
    const user = this._authService.getUserById((req.user as UserDto).id);

    return plainToClass(UserDto, user);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/settings')
  async settings(@Body() settingsDto: SettingsDto, @Req() req: Request): Promise<UserDto> {
    const user = this._authService.updateUser((req.user as UserDto).id, settingsDto);

    return plainToClass(UserDto, user);
  }

  /*
  @Post('/request-reset-password')
  async requestResetPassword(@Req() req: Request) {
    // TODO: reset password request DTO

    return null;
  }

  @Post('/reset-password')
  async resetPassword(@Req() req: Request) {
    // TODO: reset password DTO

    return null;
  }
  */
}
