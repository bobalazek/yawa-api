import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DeepPartial, Repository } from 'typeorm';
import { parse } from 'yaml';

import { Action } from '../entities/action.entity';

interface ActionTemplate {
  key: string;
  name: string;
  goals: string[];
}

@Injectable()
export class ActionsService {
  private _actionTemplates: ActionTemplate[] = [];

  constructor(@InjectRepository(Action) private readonly _actionsRepository: Repository<Action>) {}

  async findOneForUser(id: string, userId: string): Promise<Action> {
    return this._actionsRepository.findOne({
      where: {
        id,
        userId,
      },
    });
  }

  async findAllForUser(userId: string): Promise<Action[]> {
    return this._actionsRepository.find({
      where: {
        userId,
      },
    });
  }

  async getAllTemplates(): Promise<ActionTemplate[]> {
    if (this._actionTemplates.length === 0) {
      const areaTemplatesFileContents = readFileSync(resolve(__dirname, '../../../assets/data/actions.yaml'), 'utf8');
      this._actionTemplates = parse(areaTemplatesFileContents);
    }

    return this._actionTemplates;
  }

  save(action: DeepPartial<Action>, userId: string) {
    return this._actionsRepository.save({ ...action, userId });
  }
}
