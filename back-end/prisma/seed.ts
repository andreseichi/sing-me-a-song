import { prisma } from "../src/database";

import recommendationBodyFactory from "../tests/factories/recommendationBodyFactory";
import updateScoreRecommendation from "../tests/factories/updateScoreRecommendationFactory";

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

  await updateScoreRecommendation(1, "increment", 100);
  await updateScoreRecommendation(2, "increment", 25);
  await updateScoreRecommendation(3, "increment", 30);
  await updateScoreRecommendation(4, "increment", 1);
  await updateScoreRecommendation(5, "increment", 99);
  await updateScoreRecommendation(6, "decrement", 3);
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
