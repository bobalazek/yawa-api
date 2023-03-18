import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { UserAccessToken } from '../entities/user-access-token.entity';

@Injectable()
export class UserAccessTokensService {
  constructor(@InjectRepository(UserAccessToken) private _userAccessTokensRepository: Repository<UserAccessToken>) {}

  findOneById(id: string): Promise<UserAccessToken | null> {
    return this._userAccessTokensRepository.findOneBy({ id });
  }

  findOneByToken(token: string): Promise<UserAccessToken | null> {
    return this._userAccessTokensRepository.findOneBy({ token });
  }

  save(userAccessToken: DeepPartial<UserAccessToken>) {
    return this._userAccessTokensRepository.save(userAccessToken);
  }
}
