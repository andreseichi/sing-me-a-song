import { Request, Response } from "express";
import recommendationBodyFactory from "../../tests/factories/recommendationBodyFactory";
import { deleteAllData } from "../../tests/factories/scenarioFactory";
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
    ],
  });

  res.sendStatus(200);
}
