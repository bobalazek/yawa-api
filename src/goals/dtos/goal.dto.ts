import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '../../common/dtos/abstract.dto';

@Exclude()
export class GoalDto extends AbstractDto {
  @ApiProperty()
  @Expose()
  readonly name!: string;

  @ApiProperty()
  @Expose()
  readonly description?: string;
}
