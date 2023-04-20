import { Command, CommandRunner } from 'nest-commander';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { usersSeed } from '../seeds/users.seed';

@Command({ name: 'database:insert-seed-data', description: 'Inserts the seeds for the database' })
export class InsertSeedDataCommand extends CommandRunner {
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

    this._logger.info('Seeds successfully generated');
  }
}
