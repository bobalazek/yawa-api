import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly page?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly limit?: string;
}
