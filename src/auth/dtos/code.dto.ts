import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly code!: string;
}
