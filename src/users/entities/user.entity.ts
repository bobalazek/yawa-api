import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Action } from '../../actions/entities/action.entity';
import { Goal } from '../../goals/entities/goal.entity';
import { UserAccessToken } from './user-access-token.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({
    unique: true,
  })
  @Column()
  email!: string;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  newEmail?: string;

  @Column({
    nullable: true,
  })
  beforeDeletionEmail?: string;

  @Column()
  password!: string;

  @Column({
    default: 'en',
  })
  languageCode!: string;

  @Column({
    default: 'metric',
  })
  measurementSystem!: string;

  @Column({
    default: 'UTC',
  })
  timezone!: string;

  @Column()
  firstName!: string;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  emailConfirmationToken?: string;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  newEmailConfirmationToken?: string;

  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  passwordResetToken?: string;

  @Column({
    nullable: true,
  })
  emailConfirmedAt?: Date;

  @Column({
    nullable: true,
  })
  passwordResetLastRequestedAt?: Date;

  @Column({
    nullable: true,
  })
  newEmailConfirmationLastSentAt?: Date;

  @Column({
    nullable: true,
  })
  deletionRequestedAt?: Date;

  @Column({
    nullable: true,
  })
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserAccessToken, (userAccessToken) => userAccessToken.user)
  userAccessTokens: UserAccessToken[];

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];

  @OneToMany(() => Action, (action) => action.user)
  actions: Action[];
}
