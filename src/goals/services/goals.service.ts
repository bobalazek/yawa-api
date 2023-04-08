import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DeepPartial, Repository } from 'typeorm';
import { parse } from 'yaml';

import { Goal } from '../entities/goal.entity';

interface GoalTemplate {
  key: string;
  name: string;
  areas: string[];
}

@Injectable()
export class GoalsService {
  private _goalTemplates: GoalTemplate[] = [];

  constructor(@InjectRepository(Goal) private readonly _goalsRepository: Repository<Goal>) {}

  async findAll(): Promise<Goal[]> {
    return this._goalsRepository.find();
  }

  async findOneForUser(id: string, userId: string): Promise<Goal> {
    return this._goalsRepository.findOne({
      where: {
        id,
        userId,
      },
    });
  }

  async findAllForUser(userId: string): Promise<Goal[]> {
    return this._goalsRepository.find({
      where: {
        userId,
      },
    });
  }

  async getAllTemplates(): Promise<GoalTemplate[]> {
    if (this._goalTemplates.length === 0) {
      const goalTemplatesFileContents = readFileSync(resolve(__dirname, '../../../assets/data/goals.yaml'), 'utf8');
      this._goalTemplates = parse(goalTemplatesFileContents);
    }

    return this._goalTemplates;
  }

  save(goal: DeepPartial<Goal>) {
    return this._goalsRepository.save(goal);
  }

  delete(id: string) {
    return this._goalsRepository.delete(id);
  }
}
