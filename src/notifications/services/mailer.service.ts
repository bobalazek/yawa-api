import { MailerService as NestModulesMailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../../users/entities/user.entity';

@Injectable()
export class MailerService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _mailerService: NestModulesMailerService
  ) {}

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

  async sendNewEmailConfirmationSuccessEmail(user: User) {
    return this._mailerService.sendMail({
      to: user.email,
      subject: 'New email confirmation success',
      template: 'new-email-confirmation-success',
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

  async sendPasswordResetRequestEmail(user: User) {
    const BASE_URL = this._configService.get('BASE_URL');
    const { passwordResetToken } = user;
    const passwordResetUrl = `${BASE_URL}/auth/password-reset?token=${passwordResetToken}`;

    return this._mailerService.sendMail({
      to: user.email,
      subject: 'Password reset',
      template: 'password-reset',
      context: {
        user,
        passwordResetUrl,
      },
    });
  }

  async sendPasswordResetSuccessEmail(user: User) {
    return this._mailerService.sendMail({
      to: user.email,
      subject: 'Password reset success',
      template: 'password-reset-success',
      context: {
        user,
      },
    });
  }
}
