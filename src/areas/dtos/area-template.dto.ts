import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AreaTemplateDto {
  @ApiProperty()
  @Expose()
  readonly key!: string;

  @ApiProperty()
  @Expose()
  readonly name!: string;

  @ApiProperty()
  @Expose()
  readonly subheading!: string;

  @ApiProperty()
  @Expose()
  readonly description?: string;
}
