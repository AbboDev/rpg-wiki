import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateUsers = (count: number): Prisma.UserCreateManyInput[] => {
  const users: Prisma.UserCreateManyInput[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      // password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }

  return users;
};

const seed = async () => {
  const users = generateUsers(10);

  for (let user of users) {
    await prisma.user.create({ data: user });
  }

  console.log('Seed data completed!');
};

seed()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
