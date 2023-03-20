import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private _configService: ConfigService, private _mailerService: MailerService) {}

  async sendEmailConfirmationEmail(user: User) {
    const BASE_URL = this._configService.get('BASE_URL');
    const { emailConfirmationToken } = user;
    const emailConfirmationUrl = `${BASE_URL}/auth/confirm-email?token=${emailConfirmationToken}`;

    return this._mailerService.sendMail({
      to: user.email,
      subject: 'Email confirmation',
      template: 'email-confirmation',
      context: {
        user,
        emailConfirmationUrl,
      },
    });
  }

  async sendEmailConfirmationSuccessEmail(user: User) {
    return this._mailerService.sendMail({
      to: user.email,
      subject: 'Email confirmation success',
      template: 'email-confirmation-success',
      context: {
        user,
      },
    });
  }

  async sendNewEmailConfirmationEmail(user: User) {
    const BASE_URL = this._configService.get('BASE_URL');
    const { newEmailConfirmationToken } = user;
    const emailConfirmationUrl = `${BASE_URL}/auth/confirm-new-email?token=${newEmailConfirmationToken}`;

    return this._mailerService.sendMail({
      to: user.email,
      subject: 'New email confirmation',
      template: 'new-email-confirmation',
      context: {
        user,
        emailConfirmationUrl,
      },
    });
  }
}
