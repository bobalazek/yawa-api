import type { User } from './auth/entities/user.entity';

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
