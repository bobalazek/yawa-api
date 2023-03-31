import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';

import { MeasurementSystemConstraint } from '../../common/constraints/measurement-system.constraint';
import { PasswordConstraint } from '../../common/constraints/password.constraint';
import { TimezoneConstraint } from '../../common/constraints/timezone.constraint';
import { EmailExistsConstraint } from '../constraints/email-exists.constraint';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, { message: 'Invalid email' })
  @Validate(EmailExistsConstraint)
  readonly email!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @Validate(PasswordConstraint)
  readonly password!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name is required' })
  readonly firstName!: string;

  @ApiProperty()
  @IsOptional()
  @Validate(TimezoneConstraint)
  readonly timezone!: string;

  @ApiProperty()
  @IsOptional()
  @Validate(MeasurementSystemConstraint)
  readonly measurementSystem!: string;
}
