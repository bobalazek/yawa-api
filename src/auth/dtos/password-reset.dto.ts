import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordResetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly token!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly newPassword!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly newPasswordConfirm!: string;
}
