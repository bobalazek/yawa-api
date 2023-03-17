import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
  })
  email!: string;

  @Column({
    type: 'varchar',
  })
  password!: string;

  @Column({
    type: 'varchar',
    default: 'en',
  })
  languageCode!: string;

  @Column({
    type: 'varchar',
    default: 'metric',
  })
  measurementSystem!: string;

  @Column({
    type: 'varchar',
  })
  firstName!: string;

  @Column({ type: 'datetime' })
  emailConfirmedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
