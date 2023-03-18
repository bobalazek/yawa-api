import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import { MailService } from '../../mail/services/mail.service';
import { UserDto } from '../../users/dtos/user.dto';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { SettingsDto } from '../dtos/settings.dto';

@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService, private _mailService: MailService) {}

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
        emailConfirmationToken: uuidv4(),
      });

      await this._mailService.sendEmailConfirmationEmail(user);

      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('A user with this email already exists');
      }

      throw new BadRequestException('Something went wrong while creating the user');
    }
  }

  async confirmUserEmailByToken(token: string, isNewEmail: boolean = false) {
    const user = await this._usersService.findOneBy(
      isNewEmail ? 'newEmailConfirmationToken' : 'emailConfirmationToken',
      token
    );

    return this.confirmUserEmail(
      user,
      user ? (isNewEmail ? user.newEmailConfirmationCode : user.emailConfirmationCode) : '',
      isNewEmail
    );
  }

  async confirmUserEmail(userIdOrUser: string | User, code: string, isNewEmail: boolean = false) {
    const user = typeof userIdOrUser === 'string' ? await this._usersService.findOneById(userIdOrUser) : userIdOrUser;
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
      user.newEmailConfirmationToken = null;
    }

    user.emailConfirmedAt = new Date();

    await this._usersService.save(user);

    await this._mailService.sendEmailConfirmationSuccessEmail(user);

    return true;
  }

  async updateUser(userId: string, settingsDto: SettingsDto) {
    const user = await this.getById(userId);

    if (settingsDto.email) {
      user.newEmail = settingsDto.email;
      user.newEmailConfirmationCode = this._randomCode(8);
      user.newEmailConfirmationToken = uuidv4();
    }

    if (settingsDto.firstName) {
      user.firstName = settingsDto.firstName;
    }

    await this._usersService.save(user);

    if (settingsDto.email) {
      await this._mailService.sendNewEmailConfirmationEmail(user);
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
