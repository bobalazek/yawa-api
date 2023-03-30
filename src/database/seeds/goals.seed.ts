import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DeepPartial } from 'typeorm';
import { parse } from 'yaml';

import { GoalTemplateDto } from '../../goals/dtos/goal-template.dto';

const goalsSeed: DeepPartial<GoalTemplateDto[]> = [];

const goals = parse(readFileSync(resolve(__dirname, '../../../assets/data/goals.yaml'), 'utf8'));
for (const goal of goals) {
  goalsSeed.push(goal);
}

export { goalsSeed };
