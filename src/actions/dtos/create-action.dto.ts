import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import {
  GOAL_INTERVAL_UNITS,
  GOAL_TYPES,
  REMINDER_INTERVAL_TYPES,
  REMINDER_RECURRENCE_INTERVAL_UNITS,
  REMINDER_RECURRENCE_VARIANCE_UNITS,
} from '../entities/action.entity';

export class CreateActionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly template?: string;

  @ApiProperty()
  @IsString()
  @IsString()
  readonly name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly iconUrl?: string;

  // Goal
  @ApiProperty()
  @IsEnum(GOAL_TYPES)
  readonly goalType!: (typeof GOAL_TYPES)[number];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly goalAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly goalUnit?: string;

  @ApiProperty()
  @IsEnum(GOAL_INTERVAL_UNITS)
  readonly goalIntervalUnit!: (typeof GOAL_INTERVAL_UNITS)[number];

  // Reminder
  @ApiProperty()
  @IsBoolean()
  readonly reminderEnabled!: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(REMINDER_INTERVAL_TYPES)
  readonly reminderIntervalType?: (typeof REMINDER_INTERVAL_TYPES)[number];

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly reminderStartDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly reminderEndDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly reminderStartTime?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly reminderEndTime?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly reminderRecurrenceIntervalAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(REMINDER_RECURRENCE_INTERVAL_UNITS)
  readonly reminderRecurrenceIntervalUnit?: (typeof REMINDER_RECURRENCE_INTERVAL_UNITS)[number];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly reminderRecurrenceVarianceAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(REMINDER_RECURRENCE_VARIANCE_UNITS)
  readonly reminderRecurrenceVarianceUnit?: (typeof REMINDER_RECURRENCE_VARIANCE_UNITS)[number];
}
