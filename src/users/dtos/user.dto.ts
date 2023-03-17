import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

import { AbstractDto } from '../../common/dtos/abstract.dto';

export class UserDto extends AbstractDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly languageCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly measurementSystem: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsDate()
  readonly emailConfirmedAt?: Date;
}
