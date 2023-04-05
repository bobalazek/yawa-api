import { OmitType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import {
  GOAL_INTERVAL_UNITS,
  GOAL_TYPES,
  REMINDER_INTERVAL_TYPES,
  REMINDER_RECURRENCE_INTERVAL_UNITS,
} from '../entities/action.entity';
import { ActionDto } from './action.dto';

export class CreateActionDto extends OmitType(ActionDto, ['id', 'createdAt', 'updatedAt'] as const) {
  @ApiProperty()
  @Expose()
  readonly goalType!: (typeof GOAL_TYPES)[number];

  @ApiProperty()
  @Expose()
  readonly goalAmount?: number;

  @ApiProperty()
  @Expose()
  readonly goalUnit?: string;

  @ApiProperty()
  @Expose()
  readonly goalIntervalUnit!: (typeof GOAL_INTERVAL_UNITS)[number];

  @ApiProperty()
  @Expose()
  readonly reminderIntervalType?: (typeof REMINDER_INTERVAL_TYPES)[number];

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceIntervalUnit?: (typeof REMINDER_RECURRENCE_INTERVAL_UNITS)[number];
}
