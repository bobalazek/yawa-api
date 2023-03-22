import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class AbstractDto {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly id!: string;

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
