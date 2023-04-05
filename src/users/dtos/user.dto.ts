import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '../../common/dtos/abstract.dto';

@Exclude()
export class UserDto extends AbstractDto {
  @ApiProperty()
  @Expose()
  readonly email: string;

  @ApiProperty()
  @Expose()
  readonly newEmail: string | null;

  @ApiProperty()
  @Expose()
  readonly languageCode: string;

  @ApiProperty()
  @Expose()
  readonly measurementSystem: string;

  @ApiProperty()
  @Expose()
  readonly timezone: string;

  @ApiProperty()
  @Expose()
  readonly firstName: string;

  @ApiProperty()
  @Expose()
  readonly birthday: Date | null;

  @ApiProperty()
  @Expose()
  readonly avatarUrl: string | null;

  @ApiProperty()
  @Expose()
  readonly emailConfirmedAt: Date | null;

  @ApiProperty()
  @Expose()
  readonly passwordResetLastRequestedAt: Date | null;
}
