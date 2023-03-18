import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, { id: user.id });
  }

  deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
    done(null, JSON.stringify({ id: payload.id }));
  }
}
