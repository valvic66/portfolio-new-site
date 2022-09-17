import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = {
    email: `testemail@gmail.com`,
    name: 'Test name',
    post: {
      create: {
        title: 'Test post title',
      },
    },
  };

  const createUser = await prisma.user.create({ data: user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
