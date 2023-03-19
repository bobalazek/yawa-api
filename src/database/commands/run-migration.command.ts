import { Injectable, LoggerService } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Command, CommandRunner } from 'nest-commander';
import { InjectPinoLogger } from 'nestjs-pino/InjectPinoLogger';
import { DataSource } from 'typeorm';

@Injectable()
@Command({ name: 'database:run-migrations', description: 'Run the database migration' })
export class RunMigration extends CommandRunner {
  constructor(
    @InjectDataSource() private _dataSource: DataSource,
    @InjectPinoLogger() private _loggerService: LoggerService
  ) {
    super();
  }

  async run(): Promise<void> {
    this._loggerService.warn(`Running database migrations ...`);

    await this._dataSource.runMigrations();

    this._loggerService.warn(`Database migrations ran successfully`);
  }
}
