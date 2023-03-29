import type { User } from './users/entities/user.entity';

export {};

declare global {
  namespace Express {
    interface Request {
      // AuthMiddleware.ts
      user?: User & {
        _accessToken: string;
      };
    }

    interface Response {
      headers?: {
        // AppMiddleware.ts
        'X-App-Version': string;
      };
    }
  }
}
