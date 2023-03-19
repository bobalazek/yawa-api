import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GoalDto {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly id!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsNotEmpty()
  readonly createdAt!: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsNotEmpty()
  readonly updatedAt!: Date;
}
