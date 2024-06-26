import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';

@Entity('user_access_tokens')
export class UserAccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({
    unique: true,
  })
  @Column()
  token: string;

  @Index({
    unique: true,
  })
  @Column()
  refreshToken: string;

  @Column({
    nullable: true,
  })
  refreshTokenClaimedAt: Date | null;

  @Column({
    nullable: true,
  })
  expiresAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.userAccessTokens)
  user: User;
}
