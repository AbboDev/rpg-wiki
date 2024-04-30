import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import crypto from 'node:crypto';
import { parseArgs } from 'node:util';

const randomIndex = <Type>(array: Type[]) => {
  return Math.floor(Math.random() * array.length);
};

const randomFromInterval = (max: number, min?: number) => {
  min = min || 0;

  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const defaultUserCount = randomFromInterval(12, 1);
const defaultPostCount = randomFromInterval(10);
const defaultMapCount = randomFromInterval(5);

const options = {
  refresh: {
    type: 'boolean',
  },
  user: {
    type: 'string',
  },
  post: {
    type: 'string',
  },
  map: {
    type: 'string',
  },
} as const;

const prisma = new PrismaClient();

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
      description: faker.lorem.lines({ min: 1, max: 10 }),
      image: getImageName(),
      authorId,
    });
  }

  return posts;
};

const generateMaps = (
  count: number,
  authorId?: string,
): Prisma.MapCreateManyInput[] => {
  const maps: Prisma.MapCreateManyInput[] = [];

  for (let i = 0; i < count; i++) {
    maps.push({
      title: faker.lorem.words({ min: 3, max: 10 }),
      content: faker.lorem.lines({ min: 1, max: 10 }),
      image: getImageName(),
      authorId,
    });
  }

  return maps;
};

const generateMapMarkers = (
  count: number,
  mapId: string,
  mapChildId?: string | null,
  authorId?: string,
): Prisma.MapMarkerCreateManyInput[] => {
  const maps: Prisma.MapMarkerCreateManyInput[] = [];

  for (let i = 0; i < count; i++) {
    maps.push({
      title: faker.lorem.words({ min: 3, max: 10 }),
      content: faker.lorem.lines({ min: 1, max: 10 }),
      x: faker.location.latitude(),
      y: faker.location.longitude(),
      mapId,
      mapChildId,
      authorId,
    });
  }

  return maps;
};

const seed = async () => {
  const {
    values: { refresh, user, post, map },
  } = parseArgs({ options });
  console.log('Seed is starting!');

  const userCount = user && !isNaN(+user) ? Number(user) : defaultUserCount;
  const postCount = post && !isNaN(+post) ? Number(post) : defaultPostCount;
  const mapCount = map && !isNaN(+map) ? Number(map) : defaultMapCount;

  if (refresh) {
    console.log('🧹 Clean is starting!');
    const deleteMapMarker = prisma.mapMarker.deleteMany({});
    const deleteMap = prisma.map.deleteMany({});
    const deletePosts = prisma.post.deleteMany({});
    const deleteUsers = prisma.user.deleteMany({});

    await prisma.$transaction([
      deleteMapMarker,
      deleteMap,
      deletePosts,
      deleteUsers,
    ]);
    console.log('🗑 Clean completed!');
  }

  const users = generateUsers(userCount);

  for (const userData of users) {
    const user = await prisma.user.create({ data: userData });
    console.log(`👤 User ${user.name} has been created`);

    const posts = generatePosts(postCount, user.id);
    await prisma.post.createMany({ data: posts });

    console.log(`📰 Created ${postCount} posts for user ${user.name}`);

    const maps = generateMaps(mapCount, user.id);
    let previousMapId = null;
    for (const mapData of maps) {
      const map = await prisma.map.create({ data: mapData });
      console.log(`🗺️ Map ${map.title} for user ${user.name} has been created`);

      const markersCount = randomFromInterval(15, 1);

      const markers = generateMapMarkers(markersCount, map.id, null, user.id);

      if (previousMapId) {
        const marker = generateMapMarkers(1, map.id, previousMapId, user.id);

        markers.push(marker[0]);
      }

      await prisma.mapMarker.createMany({ data: markers });
      console.log(`📍 Created ${markersCount} for map ${map.title}`);

      previousMapId = map.id;
    }
  }

  console.log('Seed data completed!');
};

seed()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
