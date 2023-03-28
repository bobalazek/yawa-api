import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoalsController } from './controllers/goals.controller';
import { Goal } from './entities/goal.entity';
import { GoalsService } from './services/goals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Goal])],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
