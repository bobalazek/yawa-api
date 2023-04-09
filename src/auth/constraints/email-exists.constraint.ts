import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { AuthService } from '../../auth/services/auth.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly _authService: AuthService) {}

  async validate(value?: string): Promise<boolean> {
    if (!value) {
      return true;
    }

    try {
      await this._authService.getUserByEmail(value);

      return false;
    } catch (err: unknown) {
      return true;
    }
  }

  defaultMessage(): string {
    return 'The email you provided already exists';
  }
}
