import { MailerModule as NestModulesMailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join, resolve } from 'path';

@Module({
  imports: [
    NestModulesMailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('SMTP_TRANSPORT_URL'),
        defaults: {
          from: configService.get('SMTP_FROM'),
        },
        template: {
          dir: resolve(join(__dirname, '..', '..', 'assets', 'emails')),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
})
export class MailerModule {}
