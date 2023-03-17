import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserDto } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService) {}

  async validateUser(loginDto: LoginDto): Promise<UserDto> {
    const user = await this._usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException(`User with this username or email was not found`);
    }

    const isPasswordSame = await this.compareHash(loginDto.password, user.password);
    if (!isPasswordSame) {
      throw new UnauthorizedException(`The password you provided is incorrect`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...returnedUser } = user;

    return returnedUser;
  }

  async registerUser(registerDto: RegisterDto): Promise<UserDto> {
    const password = await this.generateHash(registerDto.password);
    const processedRegisterDto = {
      password,
      ...registerDto,
    };

    return this._usersService.create(processedRegisterDto);
  }

  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_OR_ROUNDS);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
