import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let accessToken: string | null = null;
    if (req.headers['x-authorization']) {
      accessToken = (
        Array.isArray(req.headers['x-authorization'])
          ? req.headers['x-authorization'][0]
          : req.headers['x-authorization']
      )
        .toLowerCase()
        .replace('bearer ', '');
    }

    try {
      const user = accessToken ? await this._authService.getUserByAccessToken(accessToken) : undefined;
      if (user) {
        // If you edit this, also remember to edit global.d.ts
        req.user = {
          ...user,
          _accessToken: accessToken,
        };
      }
    } catch (err) {
      // Nothing to do
    }

    next();
  }
}
