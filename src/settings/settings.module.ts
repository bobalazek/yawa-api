import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { SettingsController } from './controllers/settings.controller';

@Module({
  imports: [AuthModule],
  controllers: [SettingsController],
})
export class SettingsModule {}
