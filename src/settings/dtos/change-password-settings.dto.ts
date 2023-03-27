import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordSettingsDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly currentPassword!: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPassword!: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPasswordConfirm!: string;
}