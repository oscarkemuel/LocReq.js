import { PrismaClient } from '@prisma/client';
import exp from 'constants';

const prsimaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export { prsimaClient };



