import { Command, CommandRunner } from 'nest-commander';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';

import { usersSeed } from '../seeds/users.seed';

@Command({ name: 'database:generate-seeds', description: 'Generate the seeds for the database' })
export class GenerateSeedsCommand extends CommandRunner {
  constructor(private readonly _dataSource: DataSource, private readonly _logger: PinoLogger) {
    super();
  }

  async run(): Promise<void> {
    this._logger.info('Generating seeds...');

    // Users
    const usersRepository = this._dataSource.manager.getRepository('User');
    for (const user of usersSeed) {
      this._logger.debug(`Saving user ${user.email} ...`);

      await usersRepository.save(user);
    }

    this._logger.info('Seeds successfully generated');
  }
}
