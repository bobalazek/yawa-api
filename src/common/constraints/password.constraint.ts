import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class PasswordConstraint implements ValidatorConstraintInterface {
  validate(value?: string): boolean {
    if (!value) {
      return true;
    }

    return value.length > 6;
  }

  defaultMessage(): string {
    return 'Password must be at least 6 characters long';
  }
}
