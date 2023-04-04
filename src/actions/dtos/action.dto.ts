import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '../../common/dtos/abstract.dto';
import {
  GOAL_INTERVAL_UNITS,
  GOAL_TYPES,
  REMINDER_INTERVAL_TYPES,
  REMINDER_RECURRENCE_INTERVAL_UNITS,
  REMINDER_RECURRENCE_VARIANCE_UNITS,
} from '../entities/action.entity';

@Exclude()
export class ActionDto extends AbstractDto {
  @ApiProperty()
  @Expose()
  readonly template?: string;

  @ApiProperty()
  @Expose()
  readonly name!: string;

  @ApiProperty()
  @Expose()
  readonly description?: string;

  @ApiProperty()
  @Expose()
  readonly iconUrl?: string;

  // Goal
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

  // Reminder
  @ApiProperty()
  @Expose()
  readonly reminderEnabled!: boolean;

  @ApiProperty()
  @Expose()
  readonly reminderIntervalType?: (typeof REMINDER_INTERVAL_TYPES)[number];

  @ApiProperty()
  @Expose()
  readonly reminderStartDate?: string;

  @ApiProperty()
  @Expose()
  readonly reminderEndDate?: string;

  @ApiProperty()
  @Expose()
  readonly reminderStartTime?: string;

  @ApiProperty()
  @Expose()
  readonly reminderEndTime?: string;

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceIntervalAmount?: number;

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceIntervalUnit?: (typeof REMINDER_RECURRENCE_INTERVAL_UNITS)[number];

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceVarianceAmount?: number;

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceVarianceUnit?: (typeof REMINDER_RECURRENCE_VARIANCE_UNITS)[number];

  @ApiProperty()
  @Expose()
  readonly reminderLastExecutedAt?: Date;

  @ApiProperty()
  @Expose()
  readonly reminderNextExecutesAt?: Date;

  @ApiProperty()
  @Expose()
  readonly reminderMuteEndsAt?: Date;
}
