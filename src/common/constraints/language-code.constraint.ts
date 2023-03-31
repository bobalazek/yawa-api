import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class LanaugageCodeConstraint implements ValidatorConstraintInterface {
  validate(value?: string): boolean {
    if (!value) {
      return true;
    }

    return value === 'en';
  }

  defaultMessage(): string {
    return 'The language code you provided is invalid';
  }
}
