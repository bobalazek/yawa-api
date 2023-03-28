import { Module } from '@nestjs/common';

import { AreasController } from './controllers/areas.controller';
import { AreasService } from './services/areas.service';

@Module({
  controllers: [AreasController],
  providers: [AreasService],
})
export class AreasModule {}
