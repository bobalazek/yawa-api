import { OmitType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, MaxLength } from 'class-validator';

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
  @IsEnum(GOAL_TYPES)
  readonly goalType!: (typeof GOAL_TYPES)[number];

  @ApiProperty()
  @Expose()
  @MaxLength(3)
  readonly goalAmount?: number;

  @ApiProperty()
  @Expose()
  @MaxLength(24)
  readonly goalUnit?: string;

  @ApiProperty()
  @Expose()
  @IsEnum(GOAL_INTERVAL_UNITS)
  readonly goalIntervalUnit!: (typeof GOAL_INTERVAL_UNITS)[number];

  @ApiProperty()
  @Expose()
  @IsEnum(REMINDER_INTERVAL_TYPES)
  readonly reminderIntervalType?: (typeof REMINDER_INTERVAL_TYPES)[number];

  @ApiProperty()
  @Expose()
  @IsEnum(REMINDER_RECURRENCE_INTERVAL_UNITS)
  readonly reminderRecurrenceIntervalUnit?: (typeof REMINDER_RECURRENCE_INTERVAL_UNITS)[number];
}
