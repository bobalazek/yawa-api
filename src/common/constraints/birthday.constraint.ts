import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class BirthdayConstraint implements ValidatorConstraintInterface {
  validate(value?: string): boolean {
    if (!value) {
      return true;
    }

    const birthday = new Date(value);

    return birthday instanceof Date && !isNaN(birthday.getTime());
  }

  defaultMessage(): string {
    return 'The timezone you provided is invalid';
  }
}
