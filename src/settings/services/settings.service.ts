import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { env } from '../../common/env';
import { generateHash } from '../../common/utils/hash.utils';
import { MailerService } from '../../notifications/services/mailer.service';
import { ChangePasswordSettingsDto } from '../../settings/dtos/change-password-settings.dto';
import { ProfileSettingsDto } from '../../settings/dtos/profile-settings.dto';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class SettingsService {
  constructor(private readonly _usersService: UsersService, private readonly _mailerService: MailerService) {}

  async updateUser(user: User, profileSettingsDto: ProfileSettingsDto): Promise<User> {
    let emailChanged = false;

    if (profileSettingsDto.email !== user.email && profileSettingsDto.email !== user.newEmail) {
      const existingUser = await this._usersService.findOneByEmail(profileSettingsDto.email);
      if (existingUser && existingUser.id !== user.id) {
        throw new Error(`A user with this email already exists`);
      }

      user.newEmail = profileSettingsDto.email;
      user.newEmailConfirmationToken = uuidv4();
      user.newEmailConfirmationLastSentAt = new Date();

      emailChanged = true;
    }

    if (profileSettingsDto.firstName) {
      user.firstName = profileSettingsDto.firstName;
    }

    if (profileSettingsDto.languageCode) {
      user.timezone = profileSettingsDto.timezone;
    }

    if (profileSettingsDto.timezone) {
      user.timezone = profileSettingsDto.timezone;
    }

    if (profileSettingsDto.measurementSystem) {
      user.measurementSystem = profileSettingsDto.measurementSystem;
    }

    if (profileSettingsDto.birthday) {
      user.birthday = new Date(profileSettingsDto.birthday);
    }

    try {
      await this._usersService.save(user);
    } catch (err) {
      // In the very, VERY unlikely scenario the uuid would be a duplicate - if setting the new email
      throw new Error(`Something went wrong. Try updating the user again`);
    }

    if (emailChanged) {
      await this._mailerService.sendNewEmailConfirmationEmail(user);
    }

    return user;
  }

  async changePassword(user: User, changePasswordSettingsDto: ChangePasswordSettingsDto): Promise<User> {
    const currentPasswordHashed = await generateHash(changePasswordSettingsDto.currentPassword);
    if (currentPasswordHashed !== user.password) {
      throw new Error(`The current password you provided is incorrect`);
    }

    if (changePasswordSettingsDto.newPassword !== changePasswordSettingsDto.newPasswordConfirm) {
      throw new Error(`Passwords do not match`);
    }

    const newPasswordHashed = await generateHash(changePasswordSettingsDto.newPassword);

    user.password = newPasswordHashed;

    try {
      await this._usersService.save(user);
    } catch (err) {
      throw new Error(`Something went wrong. Try changing the password again`);
    }

    await this._mailerService.sendPasswordResetSuccessEmail(user);

    return user;
  }

  async resendNewEmailConfirmationEmail(user: User): Promise<User> {
    const now = new Date();

    const newEmailConfirmationLastRequestExpiresAt = user.newEmailConfirmationLastSentAt
      ? DateTime.fromJSDate(user.newEmailConfirmationLastSentAt)
          .plus({
            seconds: env.NEW_EMAIL_CONFIRMATION_TIMEOUT_SECONDS,
          })
          .toJSDate()
      : null;

    if (
      newEmailConfirmationLastRequestExpiresAt &&
      newEmailConfirmationLastRequestExpiresAt.getTime() > now.getTime()
    ) {
      throw new Error(
        `You already have a requested the new email confirmation email recently. Check your email or try again later.`
      );
    }

    user.newEmailConfirmationLastSentAt = now;

    try {
      await this._usersService.save(user);
    } catch (err) {
      throw new Error(`Something went wrong. Try resending the password reset email again`);
    }

    await this._mailerService.sendNewEmailConfirmationEmail(user);

    return user;
  }

  async cancelNewEmail(user: User): Promise<User> {
    user.newEmail = null;
    user.newEmailConfirmationToken = null;
    user.newEmailConfirmationLastSentAt = null;

    try {
      await this._usersService.save(user);
    } catch (err) {
      throw new Error(`Something went wrong. Try canceling the new email again`);
    }

    return user;
  }

  async requestAccountDeletion(user: User): Promise<User> {
    const now = new Date();

    user.beforeDeletionEmail = user.email;
    user.email = `pending-deletion-${user.id}-${now.getTime()}@yawa.com`;
    user.deletionRequestedAt = now;

    try {
      await this._usersService.save(user);
    } catch (err) {
      throw new Error(`Something went wrong. Try requesting the account deletion again`);
    }

    return user;
  }
}
