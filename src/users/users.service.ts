import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private _usersRepository: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this._usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this._usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this._usersRepository.findOneBy({ email });
  }

  remove(id: string) {
    return this._usersRepository.delete(id);
  }

  create(user: DeepPartial<User>) {
    return this._usersRepository.save(user);
  }
}
