import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { AbstractDto } from '../../common/dtos/abstract.dto';

@Exclude()
export class UserDto extends AbstractDto {
  @ApiProperty()
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @ApiProperty()
  @Expose()
  @IsEmail()
  @IsOptional()
  readonly newEmail?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly languageCode!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly measurementSystem!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly timezone!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly firstName!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly birthday?: Date;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly avatarUrl?: string;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsOptional()
  readonly emailConfirmedAt?: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsOptional()
  readonly passwordResetLastRequestedAt?: Date;
}
