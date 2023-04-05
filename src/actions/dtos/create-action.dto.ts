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
  readonly template: string | null;

  @ApiProperty()
  @IsString()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly iconUrl: string | null;

  // Goal
  @ApiProperty()
  @IsEnum(GOAL_TYPES)
  readonly goalType: (typeof GOAL_TYPES)[number];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly goalAmount: number | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly goalUnit: string | null;

  @ApiProperty()
  @IsEnum(GOAL_INTERVAL_UNITS)
  readonly goalIntervalUnit: (typeof GOAL_INTERVAL_UNITS)[number];

  // Reminder
  @ApiProperty()
  @IsBoolean()
  readonly reminderEnabled: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(REMINDER_INTERVAL_TYPES)
  readonly reminderIntervalType: (typeof REMINDER_INTERVAL_TYPES)[number] | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly reminderStartDate: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly reminderEndDate: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly reminderStartTime: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly reminderEndTime: string | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly reminderRecurrenceIntervalAmount: number | null;

  @ApiProperty()
  @IsOptional()
  @IsEnum(REMINDER_RECURRENCE_INTERVAL_UNITS)
  readonly reminderRecurrenceIntervalUnit: (typeof REMINDER_RECURRENCE_INTERVAL_UNITS)[number] | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly reminderRecurrenceVarianceAmount: number | null;

  @ApiProperty()
  @IsOptional()
  @IsEnum(REMINDER_RECURRENCE_VARIANCE_UNITS)
  readonly reminderRecurrenceVarianceUnit: (typeof REMINDER_RECURRENCE_VARIANCE_UNITS)[number] | null;
}
