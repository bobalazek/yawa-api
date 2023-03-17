import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AbstractDto {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly updatedAt: Date;
}
