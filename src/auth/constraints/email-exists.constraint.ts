import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { UsersService } from '../../users/services/users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly _usersService: UsersService) {}

  async validate(value?: string): Promise<boolean> {
    if (!value) {
      return true;
    }

    const user = await this._usersService.findOneByEmail(value);

    return !user;
  }

  defaultMessage(): string {
    return 'Email already exists';
  }
}
