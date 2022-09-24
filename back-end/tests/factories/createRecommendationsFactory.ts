import { prisma } from "./../../src/database";
import recommendationBodyFactory from "./recommendationBodyFactory";

export default async function createRecommendations() {
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
      recommendationBodyFactory(),
      recommendationBodyFactory(),
    ],
    skipDuplicates: true,
  });

  return await prisma.recommendation.findMany();
}
