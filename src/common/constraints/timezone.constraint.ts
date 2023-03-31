import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { IANAZone } from 'luxon';

@Injectable()
@ValidatorConstraint()
export class TimezoneConstraint implements ValidatorConstraintInterface {
  validate(value?: string): boolean {
    if (!value) {
      return true;
    }

    return IANAZone.isValidZone(value);
  }

  defaultMessage(): string {
    return 'The timezone you provided is invalid';
  }
}
