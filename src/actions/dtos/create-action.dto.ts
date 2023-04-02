import { OmitType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, MaxLength } from 'class-validator';

import { ActionDto } from './action.dto';

export class CreateActionDto extends OmitType(ActionDto, ['id', 'createdAt', 'updatedAt'] as const) {
  @ApiProperty()
  @Expose()
  @IsEnum(['binary', 'measurable'])
  goalType?: string;

  @ApiProperty()
  @Expose()
  @MaxLength(3)
  goalAmount?: number;

  @ApiProperty()
  @Expose()
  @MaxLength(24)
  goalUnit?: string;

  @ApiProperty()
  @Expose()
  @IsEnum(['day', 'week', 'month', 'year'])
  goalIntervalUnit?: string;

  @ApiProperty()
  @Expose()
  @IsEnum(['only_once', 'recurring_every_x_y', 'recurring_x_times_per_y'])
  reminderIntervalType?: string;

  @ApiProperty()
  @Expose()
  @IsEnum(['minute', 'hour', 'day', 'week', 'month', 'year'])
  reminderRecurrenceIntervalUnit?: string;
}
