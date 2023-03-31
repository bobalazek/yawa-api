import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ActionTemplateDto {
  @ApiProperty()
  @Expose()
  readonly key!: string;

  @ApiProperty()
  @Expose()
  readonly name!: string;

  @ApiProperty()
  @Expose()
  readonly goals!: string[];
}
