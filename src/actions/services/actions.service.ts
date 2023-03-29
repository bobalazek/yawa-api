import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<Action[]> {
    return this._actionsRepository.find();
  }

  async getAllTemplates(): Promise<ActionTemplate[]> {
    if (this._actionTemplates.length === 0) {
      const areaTemplatesFileContents = readFileSync(resolve(__dirname, '../../../assets/data/actions.yaml'), 'utf8');
      this._actionTemplates = parse(areaTemplatesFileContents);
    }

    return this._actionTemplates;
  }
}
