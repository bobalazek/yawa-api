import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { env } from '../../env';
import { MailerService } from '../../notifications/services/mailer.service';
import { User } from '../../users/entities/user.entity';
import { UserAccessTokensService } from '../../users/services/user-access-tokens.service';
import { UsersService } from '../../users/services/users.service';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { LoginDto } from '../dtos/login.dto';
import { PasswordResetRequestDto } from '../dtos/password-reset-request.dto';
import { RegisterDto } from '../dtos/register.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { SettingsDto } from '../dtos/settings.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _userAccessTokensService: UserAccessTokensService,
    private readonly _mailerService: MailerService
  ) {}

  async loginUser(loginDto: LoginDto): Promise<string> {
    const user = await this.validateUser(loginDto);

    try {
      const userAccessToken = await this._userAccessTokensService.save({
        user,
        token: uuidv4(),
      });

      return userAccessToken.token;
    } catch (err) {
      // In the very, VERY unlikely scenario the uuid would be a duplicate, just prompt the user to login again
      throw new BadRequestException(`Something went wrong. Try logging in again`);
    }
  }

  async logout(token: string): Promise<boolean> {
    const userAccessToken = await this._userAccessTokensService.findOneByToken(token);

    if (userAccessToken) {
      userAccessToken.expiresAt = new Date();
      await this._userAccessTokensService.save(userAccessToken);
    }

    return true;
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this._usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException(`User with this email was not found`);
    }

    const isPasswordSame = await this._compareHash(loginDto.password, user.password);
    if (!isPasswordSame) {
      throw new UnauthorizedException(`The password you provided is incorrect`);
    }

    return user;
  }

  async registerUser(registerDto: RegisterDto) {
    const password = await this._generateHash(registerDto.password);
    const processedRegisterDto = {
      ...registerDto,
      password,
    };

    try {
      const user = await this._usersService.save({
        // We need to await it, else it's not caught and it's caught as unexpectedException
        ...processedRegisterDto,
        password: await this._generateHash(processedRegisterDto.password),
        emailConfirmationToken: uuidv4(),
      });

      await this._mailerService.sendEmailConfirmationEmail(user);

      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException(`A user with this email already exists`);
      }

      throw new BadRequestException(`Something went wrong while creating the user`);
    }
  }

  async confirmUserEmail(token: string, isNewEmail: boolean = false) {
    const user = await this._usersService.findOneBy(
      isNewEmail ? 'newEmailConfirmationToken' : 'emailConfirmationToken',
      token
    );
    if (!user) {
      throw new BadRequestException(`User not found`);
    }

    if (!isNewEmail && user.emailConfirmedAt) {
      throw new BadRequestException(`Email already confirmed`);
    }

    if (isNewEmail) {
      user.email = user.newEmail;
      user.newEmail = null;
      user.newEmailConfirmationToken = null;
    } else {
      user.emailConfirmationToken = null;
    }

    user.emailConfirmedAt = new Date();

    await this._usersService.save(user);

    await this._mailerService.sendEmailConfirmationSuccessEmail(user);

    return true;
  }

  async updateUser(user: User, settingsDto: SettingsDto) {
    if (settingsDto.email) {
      user.newEmail = settingsDto.email;
      user.newEmailConfirmationToken = uuidv4();
    }

    if (settingsDto.firstName) {
      user.firstName = settingsDto.firstName;
    }

    try {
      await this._usersService.save(user);
    } catch (err) {
      // In the very, VERY unlikely scenario the uuid would be a duplicate - if setting the new email
      throw new BadRequestException(`Something went wrong. Try updating the user again`);
    }

    if (settingsDto.email) {
      await this._mailerService.sendNewEmailConfirmationEmail(user);
    }

    return user;
  }

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    const currentPasswordHashed = await this._generateHash(changePasswordDto.currentPassword);
    if (currentPasswordHashed !== user.password) {
      throw new BadRequestException(`The current password you provided is incorrect`);
    }

    if (changePasswordDto.newPassword !== changePasswordDto.newPasswordConfirm) {
      throw new BadRequestException(`Passwords do not match`);
    }

    const newPasswordHashed = await this._generateHash(changePasswordDto.newPassword);

    user.password = newPasswordHashed;

    await this._usersService.save(user);

    // TODO: maybe send an email to the user that the password was changed and maybe also log them out?

    return user;
  }

  async requestPasswordReset(passwordResetRequestDto: PasswordResetRequestDto) {
    const user = await this._usersService.findOneByEmail(passwordResetRequestDto.email);
    if (!user) {
      throw new BadRequestException(`User with this email was not found`);
    }

    const now = new Date();

    if (user.passwordResetLastRequestExpiresAt && user.passwordResetLastRequestExpiresAt.getTime() < now.getTime()) {
      throw new BadRequestException(
        `You already have a pending password reset request. Check your email or try again later.`
      );
    }

    user.passwordResetToken = uuidv4();
    user.passwordResetLastRequestedAt = now;
    user.passwordResetLastRequestExpiresAt = DateTime.fromJSDate(now)
      .plus({
        seconds: env.RESET_PASSWORD_REQUEST_EXPIRATION_SECONDS,
      })
      .toJSDate();

    try {
      await this._usersService.save(user);
    } catch (err) {
      // In the very, VERY unlikely scenario the uuid would be a duplicate - if setting the password reset
      throw new BadRequestException(`Something went wrong. Try requesting the password reset again`);
    }

    await this._mailerService.sendResetPasswordRequestEmail(user);

    return user;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    if (resetPasswordDto.newPassword !== resetPasswordDto.newPasswordConfirm) {
      throw new BadRequestException(`Passwords do not match`);
    }

    const user = await this._usersService.findOneBy('passwordResetToken', resetPasswordDto.token);
    if (!user) {
      throw new BadRequestException(`User with this token was not found`);
    }

    const now = new Date();

    if (
      !user.passwordResetLastRequestExpiresAt ||
      (user.passwordResetLastRequestExpiresAt && user.passwordResetLastRequestExpiresAt.getTime() < now.getTime())
    ) {
      throw new BadRequestException(`Seems like the token already expired. Please try and request it again.`);
    }

    user.password = await this._generateHash(resetPasswordDto.newPassword);
    user.passwordResetToken = null;
    user.passwordResetLastRequestExpiresAt = now;

    await this._usersService.save(user);

    await this._mailerService.sendPasswordResetSuccessEmail(user);

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this._usersService.findOneById(id);
    if (!user) {
      throw new BadRequestException(`User not found`);
    }

    return user;
  }

  async getUserByAccessToken(accessToken: string): Promise<User> {
    const userAccessToken = await this._userAccessTokensService.findOneByTokenWithUser(accessToken);
    if (!userAccessToken) {
      throw new BadRequestException(`A user with this access token not found`);
    }

    const now = new Date();
    if (userAccessToken.expiresAt && userAccessToken.expiresAt < now) {
      throw new BadRequestException(`The access token has expired`);
    }

    return userAccessToken.user;
  }

  private async _generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private async _compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
