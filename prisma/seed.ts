import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import crypto from 'crypto';

const prisma = new PrismaClient();

const randomIndex = <Type>(array: Type[]) => {
  return Math.floor(Math.random() * array.length);
};

const randomFromInterval = (max: number, min?: number) => {
  min = min || 0

  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getExtension = (): string => {
  const imageExtensions = ['jpg', 'jpeg', 'gif', 'png', 'webp'];
  const index = randomIndex(imageExtensions);
  return imageExtensions[index];
};

const getImageName = (): string => {
  const extension = getExtension();

  const filename = crypto
    .createHash('sha1')
    .update(faker.system.commonFileName(extension))
    .digest('hex');

  return `${filename}.${extension}`;
};

const generateUsers = (count: number): Prisma.UserCreateManyInput[] => {
  const users: Prisma.UserCreateManyInput[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      // password: faker.internet.password(),
    });
  }

  return users;
};

const generatePosts = (
  count: number,
  authorId?: string,
): Prisma.PostCreateManyInput[] => {
  const posts: Prisma.PostCreateManyInput[] = [];

  for (let i = 0; i < count; i++) {
    posts.push({
      title: faker.lorem.words({ min: 3, max: 10 }),
      content: faker.lorem.lines({ min: 1, max: 10 }),
      image: getImageName(),
      authorId,
    });
  }

  return posts;
};

const seed = async () => {
  console.log('%c' + 'Seed is starting!', 'color: Green');
  const users = generateUsers(10);

  for (let userData of users) {
    const user = await prisma.user.create({ data: userData });
    console.log(`User ${user.name} has been created`);

    const postCount = randomFromInterval(10);
    const posts = generatePosts(postCount, user.id);
    await prisma.post.createMany({ data: posts });

    console.log(`Create ${postCount} posts for user ${user.name}`, 'color: green');
  }

  console.log('Seed data completed!');
};

seed()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
