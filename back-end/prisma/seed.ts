import { prisma } from "../src/database";

import recommendationBodyFactory from "../tests/factories/recommendationBodyFactory";

async function main() {
  await prisma.recommendation.createMany({
    data: [
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
