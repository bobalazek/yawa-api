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

import { User } from '../../users/entities/user.entity';
import { Goal } from './goal.entity';

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
  key?: string;

  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    nullable: true,
  })
  userId?: string;

  @ManyToOne(() => User, (user) => user.actions)
  user?: User;

  @ManyToMany(() => Goal, (goal) => goal.actions)
  @JoinTable()
  goals: Goal[];
}
