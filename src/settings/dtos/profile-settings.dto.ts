import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

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
  readonly languageCode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly timezone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly measurementSystem?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly birthday?: string;
}
