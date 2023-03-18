import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { UserDto } from '../../users/dtos/user.dto';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { SettingsDto } from '../dtos/settings.dto';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UsersService,
    private _configService: ConfigService,
    private _mailerService: MailerService
  ) {}

  async validateUser(loginDto: LoginDto): Promise<UserDto> {
    const user = await this._usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException(`User with this username or email was not found`);
    }

    const isPasswordSame = await this._compareHash(loginDto.password, user.password);
    if (!isPasswordSame) {
      throw new UnauthorizedException(`The password you provided is incorrect`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...returnedUser } = user;

    return returnedUser;
  }

  async registerUser(registerDto: RegisterDto) {
    const password = await this._generateHash(registerDto.password);
    const processedRegisterDto = {
      password,
      ...registerDto,
    };

    try {
      const user = await this._usersService.save({
        // We need to await it, else it's not caught and it's caught as unexpectedException
        ...processedRegisterDto,
        password: await this._generateHash(processedRegisterDto.password),
        emailConfirmationCode: this._randomCode(8),
      });

      const BASE_URL = this._configService.get('BASE_URL');
      const { emailConfirmationCode } = user;
      const emailConfirmationUrl = `${BASE_URL}/api/v1/auth/confirm-email?code=${emailConfirmationCode}`;

      await this._mailerService.sendMail({
        to: user.email,
        subject: 'Email confirmation',
        template: 'email-confirmation',
        context: {
          user,
          emailConfirmationUrl,
          emailConfirmationCode,
        },
      });

      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('A user with this email already exists');
      }

      console.log(err);

      throw new BadRequestException('Something went wrong while creating the user');
    }
  }

  async confirmUserEmail(userId: string, code: string, isNewEmail: boolean = false) {
    const user = await this._usersService.findOneById(userId);
    if (!user) {
      throw new BadRequestException(`User not found`);
    }

    if (!isNewEmail && user.emailConfirmedAt) {
      throw new BadRequestException(`Email already confirmed`);
    }

    if (
      (!isNewEmail && user.emailConfirmationCode !== code) ||
      (isNewEmail && user.newEmailConfirmationCode !== code)
    ) {
      throw new BadRequestException(`Provided code is not correct`);
    }

    if (isNewEmail) {
      user.email = user.newEmail;
      user.newEmail = null;
      user.newEmailConfirmationCode = null;
    }

    user.emailConfirmedAt = new Date();

    await this._usersService.save(user);

    await this._mailerService.sendMail({
      to: user.email,
      subject: 'Email confirmation success',
      template: 'email-confirmation-success',
      context: {
        user,
      },
    });

    return true;
  }

  async updateUser(userId: string, settingsDto: SettingsDto) {
    const user = await this.getById(userId);

    if (settingsDto.email) {
      user.newEmail = settingsDto.email;
      user.newEmailConfirmationCode = this._randomCode(8);
    }

    if (settingsDto.firstName) {
      user.firstName = settingsDto.firstName;
    }

    await this._usersService.save(user);

    if (settingsDto.email) {
      const BASE_URL = this._configService.get('BASE_URL');
      const { newEmailConfirmationCode } = user;
      const emailConfirmationUrl = `${BASE_URL}/api/v1/auth/confirm-new-email?code=${newEmailConfirmationCode}`;

      await this._mailerService.sendMail({
        to: user.email,
        subject: 'New email confirmation',
        template: 'new-email-confirmation',
        context: {
          user,
          emailConfirmationUrl,
          emailConfirmationCode: newEmailConfirmationCode,
        },
      });
    }

    return user;
  }

  async getById(id: string) {
    return this._usersService.findOneById(id);
  }

  private async _generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async _compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private _randomCode(length: number = 8) {
    return crypto.randomBytes(16).toString('hex').toLowerCase().slice(0, length);
  }
}
