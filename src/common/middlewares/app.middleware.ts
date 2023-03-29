import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { env } from '../env';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('X-App-Version', env.APP_VERSION);

    next();
  }
}
