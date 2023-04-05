import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Goal } from '../../goals/entities/goal.entity';
import { User } from '../../users/entities/user.entity';
import { ActionEntry } from './action-entry.entity';

export const GOAL_TYPES = [
  'binary' /* in case you want to just say yes/no on something for a day/week/month - for example "movie night" */,
  'measurable' /* this would be for example hydration - where you want to meansure like deciliters per day/week/month */,
] as const;
export const GOAL_INTERVAL_UNITS = ['day', 'week', 'month', 'year'] as const;

export const REMINDER_INTERVAL_TYPES = ['only_once', 'recurring_every_x_y', 'recurring_x_times_per_y'] as const;
export const REMINDER_RECURRENCE_INTERVAL_UNITS = ['minute', 'hour', 'day', 'week', 'month', 'year'] as const;
export const REMINDER_RECURRENCE_VARIANCE_UNITS = REMINDER_RECURRENCE_INTERVAL_UNITS;

@Entity('actions')
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  template: string | null;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string | null;

  @Column({
    nullable: true,
  })
  iconUrl: string | null;

  // Goal
  @Column({
    type: 'enum',
    enum: GOAL_TYPES,
  })
  goalType: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  goalAmount: number | null; // 10 (<- this part) deciliters per day

  @Column({
    nullable: true,
  })
  goalUnit: string | null; // 10 deciliters (<- this part) per day

  @Column({
    type: 'enum',
    enum: GOAL_INTERVAL_UNITS,
  })
  goalIntervalUnit: string | null; // 10 deciliters per day (<- this part)

  // Reminder
  @Column()
  reminderEnabled: boolean;

  @Column({
    type: 'enum',
    enum: REMINDER_INTERVAL_TYPES,
    nullable: true,
  })
  reminderIntervalType: string | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  reminderStartDate: string | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  reminderEndDate: string | null;

  @Column({
    nullable: true,
    default: '00:00',
  })
  reminderStartTime: string | null; // 00:00 to 23:59

  @Column({
    nullable: true,
  })
  reminderEndTime: string | null; // 00:00 to 23:59

  @Column({
    type: 'int',
    nullable: true,
  })
  reminderRecurrenceIntervalAmount: number | null;

  @Column({
    type: 'enum',
    enum: REMINDER_RECURRENCE_INTERVAL_UNITS,
    nullable: true,
  })
  reminderRecurrenceIntervalUnit: string | null;

  /**
   * In case we don't want the reminder be executed at exactly the same intervals,
   * we can for example set a variance value of "15m".
   * This means, that if we have set a reminder with a frequency of 2h and it would start at 12:00,
   * we would expect the next execution to be at 14:00,
   * but with this variance value it can be anywhere between 14:00 and 14:15
   */
  @Column({
    type: 'int',
    nullable: true,
  })
  reminderRecurrenceVarianceAmount: number | null;

  @Column({
    type: 'enum',
    nullable: true,
    enum: REMINDER_RECURRENCE_VARIANCE_UNITS,
  })
  reminderRecurrenceVarianceUnit: string | null;

  @Column({
    nullable: true,
  })
  reminderLastExecutedAt: Date | null;

  @Column({
    nullable: true,
  })
  reminderNextExecutesAt: Date | null;

  @Column({
    nullable: true,
  })
  reminderMuteEndsAt: Date | null;

  /**
   * Technically entered and created should be the same,
   * but in case we want to import data from somewhere else,
   * we can set this value to the date when the action was entered.
   */
  @Column({
    nullable: true,
  })
  enteredAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.actions)
  user: User;

  @ManyToMany(() => Goal, (goal) => goal.actions)
  @JoinTable()
  goals: Goal[];

  @OneToMany(() => ActionEntry, (actionEntry) => actionEntry.action)
  actionEntries: ActionEntry[];
}
