import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';

import { PasswordConstraint } from '../../common/constraints/password.constraint';

export class PasswordResetDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly token!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(PasswordConstraint)
  readonly newPassword!: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPasswordConfirm!: string;
}
