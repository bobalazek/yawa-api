import { Module } from '@nestjs/common';

import { SettingsController } from './controllers/settings.controller';

@Module({
  controllers: [SettingsController],
})
export class SettingsModule {}
