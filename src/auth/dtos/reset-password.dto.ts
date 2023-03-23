import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
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
  readonly repeatNewPassword!: string;
}
