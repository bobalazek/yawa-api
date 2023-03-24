import { readFileSync } from 'fs';
import { DeepPartial } from 'typeorm';
import { parse } from 'yaml';

import { Goal } from '../../actions/entities/goal.entity';

const goalsSeed: DeepPartial<Goal[]> = [];

const goals = parse(readFileSync('../../../assets/data/goals.yaml', 'utf8'));
for (const goal of goals) {
  goalsSeed.push(goal);
}

export { goalsSeed };
