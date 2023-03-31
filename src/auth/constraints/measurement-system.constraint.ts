import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class MeasurementSystemConstraint implements ValidatorConstraintInterface {
  validate(value?: string): boolean {
    if (!value) {
      return true;
    }

    return value === 'metric' || value === 'imperial';
  }

  defaultMessage(): string {
    return 'The measurement system you provided is invalid';
  }
}
