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

  @Column({
    type: 'varchar',
    array: true,
  })
  areas!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    nullable: true,
  })
  userId?: string;

  @ManyToOne(() => User, (user) => user.goals)
  user?: User;

  @ManyToMany(() => Action, (action) => action.goals)
  actions: Action[];
}
