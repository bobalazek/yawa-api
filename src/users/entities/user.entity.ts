import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Action } from '../../actions/entities/action.entity';
import { Goal } from '../../goals/entities/goal.entity';
import { UserAccessToken } from './user-access-token.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({
    unique: true,
  })
  @Column()
  email: string;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  newEmail: string | null;

  @Column({
    nullable: true,
  })
  beforeDeletionEmail: string | null;

  @Column()
  password: string;

  @Column({
    default: 'en',
  })
  languageCode: string;

  @Column({
    default: 'metric',
  })
  measurementSystem: string;

  @Column({
    default: 'UTC',
  })
  timezone: string;

  @Column()
  firstName: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date | null;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  emailConfirmationToken: string | null;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  newEmailConfirmationToken: string | null;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  passwordResetToken: string | null;

  @Column({
    nullable: true,
  })
  emailConfirmedAt: Date | null;

  @Column({
    nullable: true,
  })
  passwordResetLastRequestedAt: Date | null;

  @Column({
    nullable: true,
  })
  newEmailConfirmationLastSentAt: Date | null;

  @Column({
    nullable: true,
  })
  deletionRequestedAt: Date | null;

  @Column({
    nullable: true,
  })
  deletedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserAccessToken, (userAccessToken) => userAccessToken.user)
  userAccessTokens: UserAccessToken[];

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];

  @OneToMany(() => Action, (action) => action.user)
  actions: Action[];
}
