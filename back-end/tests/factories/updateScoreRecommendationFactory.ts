import { prisma } from "./../../src/database";

export default async function updateScoreRecommendation(
  id: number,
  operation: "increment" | "decrement",
  ammount: number
) {
  const category = await prisma.recommendation.update({
    where: { id },
    data: {
      score: { [operation]: ammount },
    },
  });

  return category;
}
