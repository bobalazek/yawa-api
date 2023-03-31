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
  readonly email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Validate(LanaugageCodeConstraint)
  readonly languageCode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Validate(TimezoneConstraint)
  readonly timezone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Validate(MeasurementSystemConstraint)
  readonly measurementSystem?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Validate(BirthdayConstraint)
  readonly birthday?: string;
}
