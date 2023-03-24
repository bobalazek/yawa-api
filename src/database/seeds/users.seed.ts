import { DeepPartial } from 'typeorm';

import { User } from '../../users/entities/user.entity';

const usersSeed: DeepPartial<User[]> = [
  {
    email: 'admin@yawa.com',
    password: 'password',
    firstName: 'Admin',
  },
];

export { usersSeed };
