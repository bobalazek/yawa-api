import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly _usersRepository: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this._usersRepository.find();
  }

  findOneById(id: string): Promise<User | null> {
    return this._usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this._usersRepository.findOneBy({ email });
  }

  findOneBy(field: keyof User, value: string): Promise<User | null> {
    return this._usersRepository.findOneBy({ [field]: value });
  }

  save(user: DeepPartial<User>) {
    return this._usersRepository.save(user);
  }
}
