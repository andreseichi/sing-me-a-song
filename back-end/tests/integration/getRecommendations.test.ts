import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import recommendationBodyFactory from "../factories/recommendationBodyFactory";
import { deleteAllData } from "../factories/scenarioFactory";

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  prisma.$disconnect();
});

const server = supertest(app);

describe("route GET /recommendations", () => {
  it("should return 200 and an empty array when there are no recommendations", async () => {
    const response = await server.get("/recommendations");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return 200 and an array with last 10 recommendations", async () => {
    const recommendationBody = recommendationBodyFactory();
    const secondRecommendationBody = recommendationBodyFactory();
    const thirdRecommendationBody = recommendationBodyFactory();

    await recommendationRepository.create(recommendationBody);
    await recommendationRepository.create(secondRecommendationBody);
    await recommendationRepository.create(thirdRecommendationBody);

    const response = await server.get("/recommendations");

    const expectedAllRecommendations = await recommendationRepository.findAll();
    const expectedAllRecommendationsOrderedById =
      expectedAllRecommendations.sort((a, b) => b.id - a.id);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedAllRecommendations);
    expect(response.body.length).toBeLessThanOrEqual(10);
    expect(response.body).toEqual(expectedAllRecommendationsOrderedById);
  });
});
