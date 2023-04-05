import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import {
  GOAL_INTERVAL_UNITS,
  GOAL_TYPES,
  REMINDER_INTERVAL_TYPES,
  REMINDER_RECURRENCE_INTERVAL_UNITS,
  REMINDER_RECURRENCE_VARIANCE_UNITS,
} from '../entities/action.entity';

export class CreateActionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly template: string | null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly iconUrl: string | null;

  // Goal
  @ApiProperty()
  @IsEnum(GOAL_TYPES)
  readonly goalType: (typeof GOAL_TYPES)[number];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly goalAmount: number | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly goalUnit: string | null;

  @ApiProperty()
  @IsEnum(GOAL_INTERVAL_UNITS)
  readonly goalIntervalUnit: (typeof GOAL_INTERVAL_UNITS)[number];

  // Reminder
  @ApiProperty()
  @IsBoolean()
  readonly reminderEnabled: boolean;

  @ApiProperty()
  @IsEnum(REMINDER_INTERVAL_TYPES)
  @IsOptional()
  readonly reminderIntervalType: (typeof REMINDER_INTERVAL_TYPES)[number] | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly reminderStartDate: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly reminderEndDate: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly reminderStartTime: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly reminderEndTime: string | null;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly reminderRecurrenceIntervalAmount: number | null;

  @ApiProperty()
  @IsEnum(REMINDER_RECURRENCE_INTERVAL_UNITS)
  @IsOptional()
  readonly reminderRecurrenceIntervalUnit: (typeof REMINDER_RECURRENCE_INTERVAL_UNITS)[number] | null;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly reminderRecurrenceVarianceAmount: number | null;

  @ApiProperty()
  @IsEnum(REMINDER_RECURRENCE_VARIANCE_UNITS)
  @IsOptional()
  readonly reminderRecurrenceVarianceUnit: (typeof REMINDER_RECURRENCE_VARIANCE_UNITS)[number] | null;
}
