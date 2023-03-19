import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionsController } from './controllers/actions.controller';
import { GoalsController } from './controllers/goals.controller';
import { Action } from './entities/action.entity';
import { Goal } from './entities/goal.entity';
import { ActionsService } from './services/actions.service';
import { GoalsService } from './services/goals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, Action])],
  controllers: [GoalsController, ActionsController],
  providers: [GoalsService, ActionsService],
})
export class CommonModule {}
