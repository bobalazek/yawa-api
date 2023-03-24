import { DeepPartial } from 'typeorm';

import { User } from '../../auth/entities/user.entity';

const usersSeed: DeepPartial<User[]> = [
  {
    email: 'admin@yawa.com',
    password: 'password',
    firstName: 'Admin',
  },
];

export { usersSeed };
