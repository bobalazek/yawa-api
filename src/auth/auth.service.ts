import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService) {}

  async validateUser(username: string, rawPassword: string) {
    const user = await this._usersService.findOne(username);
    if (!user) {
      throw new Error(`User with this username or email was not found`);
    }

    const isPasswordSame = await this.compareHash(rawPassword, user.password);
    if (!isPasswordSame) {
      throw new Error(`The password you provided is incorrect`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...strippedUser } = user;

    return strippedUser;
  }

  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_OR_ROUNDS);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
