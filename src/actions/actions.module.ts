import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionsController } from './controllers/actions.controller';
import { Action } from './entities/action.entity';
import { ActionsService } from './services/actions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
