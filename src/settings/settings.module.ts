import { Module } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';

@Module({
  imports: [NotificationsModule, UsersModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
