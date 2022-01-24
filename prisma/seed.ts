import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const data = [];

async function main() {
  console.log(`Start seeding ...`);
  // Seed here
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
