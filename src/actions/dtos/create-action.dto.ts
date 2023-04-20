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
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly template?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly iconUrl?: string;

  // Goal
  @ApiProperty()
  @IsEnum(GOAL_TYPES)
  readonly goalType: (typeof GOAL_TYPES)[number];

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly goalAmount?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly goalUnit?: string;

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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly reminderStartDate: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly reminderEndDate: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly reminderStartTime: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly reminderEndTime: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly reminderRecurrenceIntervalAmount: number;

  @ApiProperty({ required: false })
  @IsEnum(REMINDER_RECURRENCE_INTERVAL_UNITS)
  @IsOptional()
  readonly reminderRecurrenceIntervalUnit: (typeof REMINDER_RECURRENCE_INTERVAL_UNITS)[number];

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly reminderRecurrenceVarianceAmount: number;

  @ApiProperty({ required: false })
  @IsEnum(REMINDER_RECURRENCE_VARIANCE_UNITS)
  @IsOptional()
  readonly reminderRecurrenceVarianceUnit: (typeof REMINDER_RECURRENCE_VARIANCE_UNITS)[number];
}
