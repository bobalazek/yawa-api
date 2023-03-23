import type { User } from './users/entities/user.entity';

export {};

// Auth
declare global {
  namespace Express {
    interface Request {
      user?: User & {
        _accessToken: string;
      };
    }
  }
}
