import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class ActionDto {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly id!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly template?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly iconUrl?: string;

  // Goal
  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly goalType?: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  readonly goalAmount?: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly goalUnit?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly goalIntervalUnit?: string;

  // Reminder
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly reminderEnabled!: boolean;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly reminderIntervalType?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly reminderStartTime?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly reminderEndTime?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly reminderOnlyOnceDate?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  readonly reminderRecurrenceIntervalUnit?: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  readonly reminderRecurrenceIntervalAmount?: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsOptional()
  readonly reminderRecurrenceStartsAt?: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsOptional()
  readonly reminderRecurrenceEndsAt?: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsOptional()
  readonly reminderLastExecutedAt?: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsOptional()
  readonly reminderNextExecutesAt?: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsOptional()
  readonly reminderMuteEndsAt?: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsNotEmpty()
  readonly createdAt!: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @IsNotEmpty()
  readonly updatedAt!: Date;
}
