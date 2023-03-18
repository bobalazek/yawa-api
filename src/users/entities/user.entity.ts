import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
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

  @Column({
    nullable: true,
  })
  newEmailConfirmationCode?: string;

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
}
