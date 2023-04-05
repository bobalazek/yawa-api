import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';

import { MeasurementSystemConstraint } from '../../common/constraints/measurement-system.constraint';
import { PasswordConstraint } from '../../common/constraints/password.constraint';
import { TimezoneConstraint } from '../../common/constraints/timezone.constraint';
import { EmailExistsConstraint } from '../constraints/email-exists.constraint';

export class RegisterDto {
  @ApiProperty()
  @Validate(EmailExistsConstraint)
  @IsEmail(undefined, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;

  @ApiProperty()
  @Validate(PasswordConstraint)
  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name is required' })
  readonly firstName: string;

  @ApiProperty()
  @Validate(TimezoneConstraint)
  @IsOptional()
  readonly timezone: string | null;

  @ApiProperty()
  @Validate(MeasurementSystemConstraint)
  @IsOptional()
  readonly measurementSystem: string | null;
}
