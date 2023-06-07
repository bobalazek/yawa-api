import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { TokenDto } from '../../common/dtos/token.dto';
import { UserDto } from '../../users/dtos/user.dto';
import { API_HEADER_X_AUTHORIZATION } from '../auth.constants';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { PasswordResetRequestDto } from '../dtos/password-reset-request.dto';
import { PasswordResetDto } from '../dtos/password-reset.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth (v1)')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    const response = await this._authService.loginUser(loginDto);

    return response;
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    const response = await this._authService.registerUser(registerDto);

    return response;
  }

  @Post('/logout')
  async logout(@Req() req: Request): Promise<{ message: string }> {
    if (req.user) {
      await this._authService.logout(req.user._accessToken);
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

  @Post('/password-reset')
  async passwordReset(@Body() resetPasswordDto: PasswordResetDto): Promise<{ message: string }> {
    await this._authService.resetPassword(resetPasswordDto);

    return { message: 'Password was successfully reset' };
  }

  @Post('/refresh-token')
  async refreshToken(@Body() tokenDto: TokenDto): Promise<AuthResponseDto> {
    const response = await this._authService.refreshToken(tokenDto.token);

    return response;
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  async profile(@Req() req: Request): Promise<UserDto> {
    const user = await this._authService.getUserById(req.user.id);

    return plainToClass(UserDto, {
      ...user,
      avatarUrl: 'https://randomuser.me/api/portraits/men/18.jpg', // TODO: replace with actual placeholder avatar
    });
  }
}
