import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { TokenDto } from '../../common/dtos/token.dto';
import { UserDto } from '../../users/dtos/user.dto';
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
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const token = await this._authService.login(loginDto);

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

  @ApiHeader({
    name: 'X-Authorization',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer e737c47f-8ec5-4ddc-b414-d93975ffd297',
    },
  })
  @UseGuards(AuthenticatedGuard)
  @Post('/confirm-email')
  async confirmEmail(@Body() tokenDto: TokenDto): Promise<{ message: string }> {
    await this._authService.confirmUserEmail(tokenDto.token);

    return { message: 'Email successfully confirmed' };
  }

  @ApiHeader({
    name: 'X-Authorization',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer e737c47f-8ec5-4ddc-b414-d93975ffd297',
    },
  })
  @UseGuards(AuthenticatedGuard)
  @Post('/confirm-new-email')
  async confirmNewEmail(@Body() tokenDto: TokenDto): Promise<{ message: string }> {
    await this._authService.confirmUserEmail(tokenDto.token, true);

    return { message: 'New email successfully confirmed' };
  }

  @ApiHeader({
    name: 'X-Authorization',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer e737c47f-8ec5-4ddc-b414-d93975ffd297',
    },
  })
  @UseGuards(AuthenticatedGuard)
  @Post('/profile')
  async profile(@Req() req: Request): Promise<UserDto> {
    const user = this._authService.getUserById(req.user.id);

    return plainToClass(UserDto, user);
  }

  @ApiHeader({
    name: 'X-Authorization',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer e737c47f-8ec5-4ddc-b414-d93975ffd297',
    },
  })
  @UseGuards(AuthenticatedGuard)
  @Post('/settings')
  async settings(@Body() settingsDto: SettingsDto, @Req() req: Request): Promise<UserDto> {
    const user = this._authService.updateUser(req.user.id, settingsDto);

    return plainToClass(UserDto, user);
  }

  /*
  @Post('/request-password-reset')
  async requestPasswordReset(@Req() req: Request) {
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
