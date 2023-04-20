import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { DeepPartial, Repository } from 'typeorm';

import { PaginationDto } from '../../common/dtos/pagination.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly _usersRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this._usersRepository.find();
  }

  async findOneById(id: string): Promise<User | null> {
    return this._usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this._usersRepository.findOneBy({ email });
  }

  async findOneBy(field: keyof User, value: string): Promise<User | null> {
    return this._usersRepository.findOneBy({ [field]: value });
  }

  async save(user: DeepPartial<User>) {
    return this._usersRepository.save(user);
  }

  async paginate(paginationDto: PaginationDto): Promise<Pagination<User>> {
    const queryBuilder = this._usersRepository.createQueryBuilder('user');
    queryBuilder.orderBy('user.createdAt', 'DESC');

    return paginate<User>(queryBuilder, {
      page: Number(paginationDto.page ?? 1),
      limit: Number(paginationDto.limit ?? 100),
    });
  }
}
