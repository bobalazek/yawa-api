import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Goal } from '../entities/goal.entity';

@Injectable()
export class GoalsService {
  constructor(@InjectRepository(Goal) private _goalsRepository: Repository<Goal>) {}

  findAll(): Promise<Goal[]> {
    return this._goalsRepository.find();
  }
}
