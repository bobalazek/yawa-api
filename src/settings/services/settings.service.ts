import { BadRequestException, Injectable } from '@nestjs/common';
import { DateTime, IANAZone } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { env } from '../../common/env';
import { generateHash } from '../../common/utils/hash';
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
        throw new BadRequestException(`A user with this email already exists`);
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
      if (profileSettingsDto.languageCode !== 'en') {
        throw new BadRequestException(`The language you provided is invalid`);
      }

      user.timezone = profileSettingsDto.timezone;
    }

    if (profileSettingsDto.timezone) {
      if (!IANAZone.isValidZone(profileSettingsDto.timezone)) {
        throw new BadRequestException(`The timezone you provided is invalid`);
      }

      user.timezone = profileSettingsDto.timezone;
    }

    if (profileSettingsDto.measurementSystem) {
      if (profileSettingsDto.measurementSystem !== 'metric' && profileSettingsDto.measurementSystem !== 'imperial') {
        throw new BadRequestException(`The measurement system you provided is invalid`);
      }

      user.measurementSystem = profileSettingsDto.measurementSystem;
    }

    if (profileSettingsDto.birthday) {
      const birthday = new Date(profileSettingsDto.birthday);
      if (!(birthday instanceof Date) || isNaN(birthday.getTime())) {
        throw new BadRequestException(`The birthday you provided is invalid`);
      }

      user.birthday = birthday;
    }

    try {
      await this._usersService.save(user);
    } catch (err) {
      // In the very, VERY unlikely scenario the uuid would be a duplicate - if setting the new email
      throw new BadRequestException(`Something went wrong. Try updating the user again`);
    }

    if (emailChanged) {
      await this._mailerService.sendNewEmailConfirmationEmail(user);
    }

    return user;
  }

  async changePassword(user: User, changePasswordSettingsDto: ChangePasswordSettingsDto): Promise<User> {
    const currentPasswordHashed = await generateHash(changePasswordSettingsDto.currentPassword);
    if (currentPasswordHashed !== user.password) {
      throw new BadRequestException(`The current password you provided is incorrect`);
    }

    if (changePasswordSettingsDto.newPassword !== changePasswordSettingsDto.newPasswordConfirm) {
      throw new BadRequestException(`Passwords do not match`);
    }

    if (changePasswordSettingsDto.newPassword.length < 6) {
      throw new BadRequestException(`Password must be at least 6 characters long`);
    }

    const newPasswordHashed = await generateHash(changePasswordSettingsDto.newPassword);

    user.password = newPasswordHashed;

    await this._usersService.save(user);

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
      throw new BadRequestException(
        `You already have a requested the new email confirmation email recently. Check your email or try again later.`
      );
    }

    user.newEmailConfirmationLastSentAt = now;

    await this._usersService.save(user);

    await this._mailerService.sendNewEmailConfirmationEmail(user);

    return user;
  }

  async cancelNewEmail(user: User): Promise<User> {
    user.newEmail = null;
    user.newEmailConfirmationToken = null;
    user.newEmailConfirmationLastSentAt = null;

    await this._usersService.save(user);

    return user;
  }

  async requestAccountDeletion(user: User): Promise<User> {
    const now = new Date();

    user.beforeDeletionEmail = user.email;
    user.email = `pending-deletion-${user.id}-${now.getTime()}@yawa.com`;
    user.deletionRequestedAt = now;

    await this._usersService.save(user);

    return user;
  }
}
