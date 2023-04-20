import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { env } from '../../common/env';
import { compareHash, generateHash } from '../../common/utils/hash.utils';
import { MailerService } from '../../notifications/services/mailer.service';
import { User } from '../../users/entities/user.entity';
import { UserAccessTokensService } from '../../users/services/user-access-tokens.service';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { PasswordResetRequestDto } from '../dtos/password-reset-request.dto';
import { PasswordResetDto } from '../dtos/password-reset.dto';
import { RegisterDto } from '../dtos/register.dto';

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
      throw new Error(`Something went wrong. Try logging in again`);
    }
  }

  async logout(token: string): Promise<boolean> {
    const userAccessToken = await this._userAccessTokensService.findOneByToken(token);

    if (userAccessToken) {
      userAccessToken.expiresAt = new Date();

      try {
        await this._userAccessTokensService.save(userAccessToken);
      } catch (err) {
        throw new Error(`Something went wrong. Try logging out again`);
      }
    }

    return true;
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this._usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException(`User with this email was not found`);
    }

    const isPasswordSame = await compareHash(loginDto.password, user.password);
    if (!isPasswordSame) {
      throw new UnauthorizedException(`The password you provided is incorrect`);
    }

    return user;
  }

  async registerUser(registerDto: RegisterDto): Promise<string> {
    const password = await generateHash(registerDto.password);
    const processedRegisterDto = {
      ...registerDto,
      password,
    };

    let user: User;

    try {
      user = await this._usersService.save({
        // We need to await it, else it's not caught and it's caught as unexpectedException
        ...processedRegisterDto,
        password: await generateHash(processedRegisterDto.password),
        emailConfirmationToken: uuidv4(),
        roles: ['ROLE_USER'],
      });
    } catch (err) {
      if (err.code === '23505') {
        throw new Error(`A user with this email already exists`);
      }

      throw new Error(`Something went wrong while creating the user`);
    }

    await this._mailerService.sendEmailConfirmationEmail(user);

    return this.loginUser(processedRegisterDto);
  }

  async confirmUserEmail(token: string, isNewEmail: boolean = false): Promise<User> {
    const user = await this._usersService.findOneBy(
      isNewEmail ? 'newEmailConfirmationToken' : 'emailConfirmationToken',
      token
    );
    if (!user) {
      throw new Error(`Token already used or expired`);
    }

    if (!isNewEmail && user.emailConfirmedAt) {
      throw new Error(`Email already confirmed`);
    }

    if (isNewEmail) {
      user.email = user.newEmail;
      user.newEmail = null;
      user.newEmailConfirmationToken = null;
    } else {
      user.emailConfirmationToken = null;
    }

    user.emailConfirmedAt = new Date();

    try {
      await this._usersService.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new Error(
          `A user with this email seems to have already been created in the meantime. Please go back to your settings and change the email`
        );
      }

      throw new Error(`Something went wrong. Please try and confirm your email again`);
    }

    if (isNewEmail) {
      await this._mailerService.sendNewEmailConfirmationSuccessEmail(user);
    } else {
      await this._mailerService.sendEmailConfirmationSuccessEmail(user);
    }

    return user;
  }

  async requestPasswordReset(passwordResetRequestDto: PasswordResetRequestDto): Promise<User> {
    const user = await this._usersService.findOneByEmail(passwordResetRequestDto.email);
    if (!user) {
      throw new Error(`User with this email was not found`);
    }

    const now = new Date();

    const passwordResetLastRequestExpiresAt = user.passwordResetLastRequestedAt
      ? DateTime.fromJSDate(user.passwordResetLastRequestedAt)
          .plus({
            seconds: env.PASSWORD_RESET_REQUEST_EXPIRATION_SECONDS,
          })
          .toJSDate()
      : null;

    if (passwordResetLastRequestExpiresAt && passwordResetLastRequestExpiresAt.getTime() > now.getTime()) {
      throw new Error(`You already have a pending password reset request. Check your email or try again later.`);
    }

    user.passwordResetToken = uuidv4();
    user.passwordResetLastRequestedAt = now;

    try {
      await this._usersService.save(user);
    } catch (err) {
      // In the very, VERY unlikely scenario the uuid would be a duplicate - if setting the password reset
      throw new Error(`Something went wrong. Try requesting the password reset again`);
    }

    await this._mailerService.sendPasswordResetRequestEmail(user);

    return user;
  }

  async resetPassword(resetPasswordDto: PasswordResetDto): Promise<User> {
    if (!resetPasswordDto.newPassword) {
      throw new Error(`New password is required`);
    }

    if (resetPasswordDto.newPassword !== resetPasswordDto.newPasswordConfirm) {
      throw new Error(`Passwords do not match`);
    }

    const user = await this._usersService.findOneBy('passwordResetToken', resetPasswordDto.token);
    if (!user) {
      throw new Error(`User with this token was not found`);
    }

    const now = new Date();

    const passwordResetLastRequestExpiresAt = user.passwordResetLastRequestedAt
      ? DateTime.fromJSDate(user.passwordResetLastRequestedAt)
          .plus({
            seconds: env.PASSWORD_RESET_REQUEST_EXPIRATION_SECONDS,
          })
          .toJSDate()
      : null;

    if (
      !passwordResetLastRequestExpiresAt ||
      (passwordResetLastRequestExpiresAt && passwordResetLastRequestExpiresAt.getTime() < now.getTime())
    ) {
      throw new Error(`Seems like the token already expired. Please try and request it again.`);
    }

    user.password = await generateHash(resetPasswordDto.newPassword);
    user.passwordResetToken = null;
    user.passwordResetLastRequestedAt = now;

    try {
      await this._usersService.save(user);
    } catch (err) {
      throw new Error(`Something went wrong. Try resetting the password again`);
    }

    await this._mailerService.sendPasswordResetSuccessEmail(user);

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this._usersService.findOneById(id);
    if (!user) {
      throw new Error(`User not found`);
    }

    return user;
  }

  async getUserByAccessToken(accessToken: string): Promise<User> {
    const userAccessToken = await this._userAccessTokensService.findOneByTokenWithUser(accessToken);
    if (!userAccessToken) {
      throw new Error(`A user with this access token not found`);
    }

    const now = new Date();
    if (userAccessToken.expiresAt && userAccessToken.expiresAt < now) {
      throw new Error(`The access token has expired`);
    }

    return userAccessToken.user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this._usersService.findOneByEmail(email);
    if (!user) {
      throw new Error(`A user with this email not found`);
    }

    return user;
  }
}
