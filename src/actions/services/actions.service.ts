import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Action } from '../entities/action.entity';

@Injectable()
export class ActionsService {
  constructor(@InjectRepository(Action) private readonly _actionsRepository: Repository<Action>) {}

  findAll(): Promise<Action[]> {
    return this._actionsRepository.find();
  }
}
