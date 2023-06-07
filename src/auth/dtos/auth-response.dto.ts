import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}
