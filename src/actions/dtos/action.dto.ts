import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '../../common/dtos/abstract.dto';

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
  readonly goalType?: string;

  @ApiProperty()
  @Expose()
  readonly goalAmount?: number;

  @ApiProperty()
  @Expose()
  readonly goalUnit?: string;

  @ApiProperty()
  @Expose()
  readonly goalIntervalUnit?: string;

  // Reminder
  @ApiProperty()
  @Expose()
  readonly reminderEnabled!: boolean;

  @ApiProperty()
  @Expose()
  readonly reminderIntervalType?: string;

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
  readonly reminderRecurrenceIntervalUnit?: string;

  @ApiProperty()
  @Expose()
  readonly reminderRecurrenceIntervalAmount?: number;

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
