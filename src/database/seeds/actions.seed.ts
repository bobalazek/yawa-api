import { readFileSync } from 'fs';
import { DeepPartial } from 'typeorm';
import { parse } from 'yaml';

import { Action } from '../../actions/entities/action.entity';

const actionsSeed: DeepPartial<Action[]> = [];

const actions = parse(readFileSync('../../../assets/data/actions.yaml', 'utf8'));
for (const action of actions) {
  actionsSeed.push(action);
}

export { actionsSeed };
