import { Command, CommandRunner } from 'nest-commander';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';

@Command({ name: 'database:generate-seeds', description: 'Generate the seeds for the database' })
export class GenerateSeedsCommand extends CommandRunner {
  constructor(private readonly _dataSource: DataSource, private readonly _logger: PinoLogger) {
    super();
  }

  async run(): Promise<void> {
    this._logger.info('Generating seeds...');

    // TODO

    this._logger.info('Seeds successfully generated');
  }
}
