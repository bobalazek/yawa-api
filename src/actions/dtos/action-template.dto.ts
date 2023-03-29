import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class ActionTemplateDto {
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
  readonly goals!: string[];
}
