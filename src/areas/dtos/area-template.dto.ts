import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class AreaTemplateDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly key!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly subheading!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly description?: string;
}
