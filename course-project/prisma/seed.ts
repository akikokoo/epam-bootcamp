import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@innovatepam.local' },
    update: {},
    create: {
      email: 'admin@innovatepam.local',
      passwordHash,
      role: 'admin',
    },
  });
  console.log('Seeded admin: admin@innovatepam.local / Admin123!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
