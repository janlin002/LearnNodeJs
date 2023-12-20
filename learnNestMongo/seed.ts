import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  const allUsers = await prisma.user.create({
    data: {
      name: 'Alice',
      email: '123',
    },
  });
  console.log(allUsers);
  // ... you will write your Prisma Client queries here
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
