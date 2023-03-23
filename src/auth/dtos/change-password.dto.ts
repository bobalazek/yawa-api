import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly currentPassword!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly newPassword!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly newPasswordConfirm!: string;
}
