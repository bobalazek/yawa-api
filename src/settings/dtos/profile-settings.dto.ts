import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Validate } from 'class-validator';
import { BirthdayConstraint } from 'src/common/constraints/birthday.constraint';

import { LanaugageCodeConstraint } from '../../common/constraints/language-code.constraint';
import { MeasurementSystemConstraint } from '../../common/constraints/measurement-system.constraint';
import { TimezoneConstraint } from '../../common/constraints/timezone.constraint';

export class ProfileSettingsDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstName: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(LanaugageCodeConstraint)
  readonly languageCode: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(TimezoneConstraint)
  readonly timezone: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(MeasurementSystemConstraint)
  readonly measurementSystem: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(BirthdayConstraint)
  readonly birthday: string | null;
}
