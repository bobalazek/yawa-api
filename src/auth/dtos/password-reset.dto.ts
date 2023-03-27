import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PasswordResetDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly token!: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPassword!: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPasswordConfirm!: string;
}
