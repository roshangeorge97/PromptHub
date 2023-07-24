import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function seedMissedSlugData() {
  const posts = await prisma.chatPrompt.findMany({});

  for (const post of posts) {
    const title = post.title;
    const slug = slugify(title, { lower: true });

    await prisma.chatPrompt.update({
      where: {
        id: post.id
      },
      data: {
        slug
      }
    });
  }
}

async function seedMissedUsername() {
  const users = await prisma.user.findMany({});
  for (const user of users) {
    if (!user.username) {
      const username = user.email?.split('@')[0];
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          username
        }
      });
    }
  }
}

async function main() {
  console.log(`Start seeding ...`);
  await seedMissedSlugData();
  await seedMissedUsername();
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
