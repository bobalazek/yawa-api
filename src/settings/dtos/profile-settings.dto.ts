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
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(LanaugageCodeConstraint)
  readonly languageCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(TimezoneConstraint)
  readonly timezone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(MeasurementSystemConstraint)
  readonly measurementSystem?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(BirthdayConstraint)
  readonly birthday?: string;
}
