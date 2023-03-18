import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { UserDto } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService) {}

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

  async registerUser(registerDto: RegisterDto): Promise<UserDto> {
    const password = await this._generateHash(registerDto.password);
    const processedRegisterDto = {
      password,
      ...registerDto,
    };

    try {
      return await this._usersService.save({
        // We need to await it, else it's not caught and it's caught as unexpectedException
        ...processedRegisterDto,
        password: await this._generateHash(processedRegisterDto.password),
        emailConfirmationCode: crypto.randomBytes(16).toString('hex').slice(0, 8),
      });
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('A user with this email already exists');
      }

      throw new BadRequestException('Something went wrong while creating the user');
    }
  }

  async confirmUserEmail(userId: string, code: string): Promise<true> {
    const user = await this._usersService.findOneById(userId);
    if (!user) {
      throw new BadRequestException(`User not found`);
    }

    if (user.emailConfirmedAt) {
      throw new BadRequestException(`Email already confirmed`);
    }

    if (user.emailConfirmationCode !== code) {
      throw new BadRequestException(`Provided code is not correct`);
    }

    user.emailConfirmedAt = new Date();

    await this._usersService.save(user);

    return true;
  }

  private async _generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async _compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
