import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { UserAccessToken } from '../entities/user-access-token.entity';

@Injectable()
export class UserAccessTokensService {
  constructor(
    @InjectRepository(UserAccessToken) private readonly _userAccessTokensRepository: Repository<UserAccessToken>
  ) {}

  async findOneById(id: string): Promise<UserAccessToken | null> {
    return this._userAccessTokensRepository.findOneBy({ id });
  }

  async findOneByToken(token: string): Promise<UserAccessToken | null> {
    return this._userAccessTokensRepository.findOneBy({ token });
  }

  async findOneByTokenWithUser(token: string): Promise<UserAccessToken | null> {
    return this._userAccessTokensRepository.findOne({ where: { token }, relations: ['user'] });
  }

  async save(userAccessToken: DeepPartial<UserAccessToken>) {
    return this._userAccessTokensRepository.save(userAccessToken);
  }
}
