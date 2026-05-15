import { PrismaClient } from '@prisma/client';

// Singleton pattern — one Prisma instance per process
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
});

export { prisma };
