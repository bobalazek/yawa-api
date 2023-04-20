import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Validate } from 'class-validator';

import { BirthdayConstraint } from '../../common/constraints/birthday.constraint';
import { LanaugageCodeConstraint } from '../../common/constraints/language-code.constraint';
import { MeasurementSystemConstraint } from '../../common/constraints/measurement-system.constraint';
import { TimezoneConstraint } from '../../common/constraints/timezone.constraint';

export class ProfileSettingsDto {
  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({ required: false })
  @Validate(LanaugageCodeConstraint)
  @IsString()
  @IsOptional()
  readonly languageCode: string;

  @ApiProperty({ required: false })
  @Validate(TimezoneConstraint)
  @IsString()
  @IsOptional()
  readonly timezone: string;

  @ApiProperty({ required: false })
  @Validate(MeasurementSystemConstraint)
  @IsString()
  @IsOptional()
  readonly measurementSystem: string;

  @ApiProperty({ required: false })
  @Validate(BirthdayConstraint)
  @IsString()
  @IsOptional()
  readonly birthday: string;
}
