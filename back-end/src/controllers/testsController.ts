import { Request, Response } from "express";
import recommendationBodyFactory from "../../tests/factories/recommendationBodyFactory";
import { deleteAllData } from "../../tests/factories/scenarioFactory";
import updateScoreRecommendation from "../../tests/factories/updateScoreRecommendationFactory";
import { prisma } from "../database";

export async function resetDatabase(req: Request, res: Response) {
  await deleteAllData();

  res.sendStatus(200);
}

export async function seedDatabase(req: Request, res: Response) {
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

  res.sendStatus(200);
}
