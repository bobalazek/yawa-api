import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

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
  emailConfirmedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
