import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Goal } from '../../goals/entities/goal.entity';
import { User } from '../../users/entities/user.entity';

@Entity('actions')
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  template?: string;

  @Column({
    nullable: true,
  })
  userId?: string;

  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column({
    nullable: true,
  })
  iconUrl?: string;

  // Goal
  @Column({
    type: 'enum',
    enum: [
      'binary' /* in case you want to just say yes/no on something for a day/week/month - for example "movie night" */,
      'measurable' /* this would be for example hydration - where you want to meansure like deciliters per day/week/month */,
    ],
    nullable: true,
  })
  goalType?: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  goalAmount?: number; // 10 (<- this part) deciliters per day

  @Column({
    nullable: true,
  })
  goalUnit?: string; // 10 deciliters (<- this part) per day - can be "deciliters" (drank water, ...), "minutes" (walk in nature, read, ...)

  @Column({
    type: 'enum',
    nullable: true,
    enum: ['day', 'week', 'month', 'year'],
  })
  goalIntervalUnit?: string; // 10 deciliters per day (<- this part)

  // Reminder
  @Column()
  reminderEnabled!: boolean;

  @Column({
    type: 'enum',
    enum: ['only_once', 'recurring_every_x_y', 'recurring_x_times_per_y'],
    nullable: true,
  })
  reminderIntervalType?: string;

  @Column({
    nullable: true,
    default: '00:00',
  })
  reminderStartTime?: string; // 00:00 to 23:59

  @Column({
    nullable: true,
  })
  reminderEndTime?: string; // 00:00 to 23:59

  @Column({
    type: 'date',
    nullable: true,
  })
  reminderOnlyOnceDate?: string; // only if the type is set to only_once

  @Column({
    type: 'enum',
    enum: ['minute', 'hour', 'day', 'week', 'month', 'year'],
    nullable: true,
  })
  reminderRecurrenceIntervalUnit?: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  reminderRecurrenceIntervalAmount?: number; // 1, 2, 4, 8, ...

  /*
  @Column({
    nullable: true,
  })
  reminderRecurrenceVariance?: string; // In case we don't want the reminder be executed at exactly the same intervals, we can for example set a variance value of "15m". This means, that if we have set a reminder with a frequency of 2h and it would start at 12:00, we would expect the next execution to be at 14:00, but with this variance value it can be anywhere between 14:00 and 14:15
  */

  @Column({
    nullable: true,
  })
  reminderRecurrenceStartsAt?: Date;

  @Column({
    nullable: true,
  })
  reminderRecurrenceEndsAt?: Date;

  @Column({
    nullable: true,
  })
  reminderLastExecutedAt?: Date;

  @Column({
    nullable: true,
  })
  reminderNextExecutesAt?: Date;

  @Column({
    nullable: true,
  })
  reminderMuteEndsAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.actions)
  user?: User;

  @ManyToMany(() => Goal, (goal) => goal.actions)
  @JoinTable()
  goals: Goal[];
}
