import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
