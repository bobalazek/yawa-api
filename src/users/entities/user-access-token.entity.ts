import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';

@Entity('user_access_tokens')
export class UserAccessToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({
    unique: true,
  })
  @Column()
  token!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.userAccessTokens)
  user!: User;

  @Column({
    nullable: true,
  })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
