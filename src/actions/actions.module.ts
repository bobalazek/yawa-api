import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionsController } from './controllers/actions.controller';
import { ActionEntry } from './entities/action-entry.entity';
import { Action } from './entities/action.entity';
import { ActionsService } from './services/actions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Action, ActionEntry])],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
