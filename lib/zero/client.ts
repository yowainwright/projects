import { Zero } from '@rocicorp/zero';
import { schema } from './schema';

export const zero = new Zero({
  schema,
  userID: 'anonymous',
  server: process.env.NEXT_PUBLIC_ZERO_SERVER,
});
