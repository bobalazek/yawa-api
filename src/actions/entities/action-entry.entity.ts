import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Action } from './action.entity';

@Entity('action_entries')
export class ActionEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column()
  actionId!: string;

  @Column({
    type: 'int',
  })
  amount!: number;

  /**
   * Technically entered and created should be the same,
   * but in case we want to import data from somewhere else,
   * we can set this value to the date when the action was entered.
   */
  @Column({
    nullable: true,
  })
  enteredAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.actions)
  user!: User;

  @ManyToOne(() => Action, (action) => action.actionEntries)
  @JoinTable()
  action!: Action;
}
