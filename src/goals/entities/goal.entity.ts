import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Action } from '../../actions/entities/action.entity';
import { User } from '../../users/entities/user.entity';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  key: string | null;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'varchar',
    array: true,
  })
  areas: string[];

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

  @Column({
    nullable: true,
  })
  userId: string | null;

  @ManyToOne(() => User, (user) => user.goals)
  user: User | null;

  @ManyToMany(() => Action, (action) => action.goals)
  actions: Action[];
}
