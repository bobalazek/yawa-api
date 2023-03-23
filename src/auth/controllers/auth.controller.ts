import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { TokenDto } from '../../common/dtos/token.dto';
import { UserDto } from '../../users/dtos/user.dto';
import { LoginDto } from '../dtos/login.dto';
import { PasswordResetRequestDto } from '../dtos/password-reset-request.dto';
import { RegisterDto } from '../dtos/register.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth (API v1)')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const token = await this._authService.loginUser(loginDto);

    return { token };
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    const createdUser = await this._authService.registerUser(registerDto);

    return plainToClass(UserDto, createdUser);
  }

  @Post('/logout')
  async logout(@Req() req: Request): Promise<{ message: string }> {
    if (req.user) {
      await this._authService.logout(req.user.token);
    }

    return { message: 'User successfully logged out' };
  }

  @Post('/confirm-email')
  async confirmEmail(@Body() tokenDto: TokenDto): Promise<{ message: string }> {
    await this._authService.confirmUserEmail(tokenDto.token);

    return { message: 'Email successfully confirmed' };
  }

  @Post('/confirm-new-email')
  async confirmNewEmail(@Body() tokenDto: TokenDto): Promise<{ message: string }> {
    await this._authService.confirmUserEmail(tokenDto.token, true);

    return { message: 'New email successfully confirmed' };
  }

  @Post('/request-password-reset')
  async requestPasswordReset(@Body() passwordResetRequestDto: PasswordResetRequestDto): Promise<{ message: string }> {
    await this._authService.requestPasswordReset(passwordResetRequestDto);

    return { message: 'Password reset successfully requested' };
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    await this._authService.resetPassword(resetPasswordDto);

    return { message: 'Password was successfully reset' };
  }
}
