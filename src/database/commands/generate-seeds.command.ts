import { Command, CommandRunner } from 'nest-commander';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';

import { Action } from '../../actions/entities/action.entity';
import { Goal } from '../../actions/entities/goal.entity';
import { User } from '../../auth/entities/user.entity';
import { actionsSeed } from '../seeds/actions.seed';
import { goalsSeed } from '../seeds/goals.seed';
import { usersSeed } from '../seeds/users.seed';

@Command({ name: 'database:generate-seeds', description: 'Generate the seeds for the database' })
export class GenerateSeedsCommand extends CommandRunner {
  constructor(private readonly _dataSource: DataSource, private readonly _logger: PinoLogger) {
    super();
  }

  async run(): Promise<void> {
    this._logger.info('Generating seeds ...');

    // Users
    this._logger.info('Adding users ...');

    const usersRepository = this._dataSource.manager.getRepository(User);
    for (const user of usersSeed) {
      this._logger.debug(`Saving user ${user.email} ...`);

      await usersRepository.save(user);
    }

    // Goals
    this._logger.info('Adding goals ...');

    const goalsRepository = this._dataSource.manager.getRepository(Goal);
    for (const goal of goalsSeed) {
      this._logger.debug(`Saving goal ${goal.key} ...`);

      await goalsRepository.save(goal);
    }

    // Actions
    this._logger.info('Adding actions ...');

    const actionsRepository = this._dataSource.manager.getRepository(Action);
    for (const action of actionsSeed) {
      this._logger.debug(`Saving action ${action.key} ...`);

      await actionsRepository.save(action);
    }

    this._logger.info('Seeds successfully generated');
  }
}
