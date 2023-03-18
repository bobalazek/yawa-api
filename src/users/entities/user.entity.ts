import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({
    nullable: true,
  })
  newEmail?: string;

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

  @Column()
  firstName!: string;

  @Column()
  emailConfirmationCode!: string;

  // This use is used when confirming it via the email
  @Index({
    unique: true,
  })
  @Column()
  emailConfirmationToken!: string;

  @Column({
    nullable: true,
  })
  newEmailConfirmationCode?: string;

  // This use is used when confirming it via the email
  @Index({
    unique: true,
  })
  @Column({
    nullable: true,
  })
  newEmailConfirmationToken?: string;

  @Column({
    nullable: true,
  })
  passwordResetCode?: string;

  @Column({
    nullable: true,
  })
  emailConfirmedAt?: Date;

  @Column({
    nullable: true,
  })
  lastPasswordResetRequestedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserAccessToken, (userAccessToken) => userAccessToken.user)
  userAccessTokens: UserAccessToken[];
}
