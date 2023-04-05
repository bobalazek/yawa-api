import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Validate } from 'class-validator';
import { BirthdayConstraint } from 'src/common/constraints/birthday.constraint';

import { LanaugageCodeConstraint } from '../../common/constraints/language-code.constraint';
import { MeasurementSystemConstraint } from '../../common/constraints/measurement-system.constraint';
import { TimezoneConstraint } from '../../common/constraints/timezone.constraint';

export class ProfileSettingsDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  readonly email: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly firstName: string | null;

  @ApiProperty()
  @Validate(LanaugageCodeConstraint)
  @IsString()
  @IsOptional()
  readonly languageCode: string | null;

  @ApiProperty()
  @Validate(TimezoneConstraint)
  @IsString()
  @IsOptional()
  readonly timezone: string | null;

  @ApiProperty()
  @Validate(MeasurementSystemConstraint)
  @IsString()
  @IsOptional()
  readonly measurementSystem: string | null;

  @ApiProperty()
  @Validate(BirthdayConstraint)
  @IsString()
  @IsOptional()
  readonly birthday: string | null;
}
