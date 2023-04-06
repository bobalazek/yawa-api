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
  readonly template: string | null;

  @ApiProperty()
  @Expose()
  readonly name: string;

  @ApiProperty()
  @Expose()
  readonly description: string | null;

  @ApiProperty()
  @Expose()
  readonly iconUrl: string | null;

  // Goal
  @ApiProperty()
  @Expose()
  readonly goalType: (typeof GOAL_TYPES)[number];

  @ApiProperty()
  @Expose()
  readonly goalAmount: number | null;

  @ApiProperty()
  @Expose()
  readonly goalUnit: string | null;

  @ApiProperty()
  @Expose()
  readonly goalIntervalUnit: (typeof GOAL_INTERVAL_UNITS)[number];

  // Reminder
  @ApiProperty()
  @Expose()
  readonly reminderEnabled: boolean;

  @ApiProperty()
  @Expose()
  readonly reminderIntervalType: (typeof REMINDER_INTERVAL_TYPES)[number] | null;

  @ApiProperty()
  @Expose()
  readonly reminderStartDate: string | null;

  @ApiProperty()
  @Expose()
  readonly reminderEndDate: string | null;

  @ApiProperty()
  @Expose()
  readonly reminderStartTime: string | null;

  @ApiProperty()
  @Expose()
  readonly reminderEndTime: string | null;

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceIntervalAmount: number | null;

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceIntervalUnit: (typeof REMINDER_RECURRENCE_INTERVAL_UNITS)[number] | null;

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceVarianceAmount: number | null;

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceVarianceUnit: (typeof REMINDER_RECURRENCE_VARIANCE_UNITS)[number] | null;

  @ApiProperty()
  @Expose()
  readonly reminderLastExecutedAt: Date | null;

  @ApiProperty()
  @Expose()
  readonly reminderNextExecutesAt: Date | null;

  @ApiProperty()
  @Expose()
  readonly reminderMuteEndsAt: Date | null;

  @ApiProperty()
  @Expose()
  readonly goalNextPeriodExpiresAt: Date | null;

  @ApiProperty()
  @Expose()
  readonly enteredAt: Date | null;
}
