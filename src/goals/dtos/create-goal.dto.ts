import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateGoalDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description: string;
}
