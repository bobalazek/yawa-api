import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';

import { EmailExistsConstraint } from '../constraints/email-exists.constraint';
import { MeasurementSystemConstraint } from '../constraints/measurement-system.constraint';
import { PasswordConstraint } from '../constraints/password.constraint';
import { TimezoneConstraint } from '../constraints/timezone.constraint';

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
