import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AbstractDto {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly createdAt: Date;

  @ApiProperty()
  @Expose()
  readonly updatedAt: Date;
}
