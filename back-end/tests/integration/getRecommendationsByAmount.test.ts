import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import createRecommendations from "../factories/createRecommendationsFactory";
import recommendationBodyFactory from "../factories/recommendationBodyFactory";
import { deleteAllData } from "../factories/scenarioFactory";
import updateScoreRecommendation from "../factories/updateScoreRecommendationFactory";

beforeEach(async () => {
  await deleteAllData();
  jest.resetAllMocks();
});

afterAll(async () => {
  prisma.$disconnect();
});

const server = supertest(app);

describe("route GET /recommendations/top/:amount", () => {
  it("should return an empty array when there are no recommendations", async () => {
    const response = await server.get("/recommendations/top/10");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return an array with the top 10 recommendations if the amount in the params is 10", async () => {
    await createRecommendations();
    const amount = 10;

    await updateScoreRecommendation(1, "increment", 10);
    await updateScoreRecommendation(2, "increment", 100);
    await updateScoreRecommendation(5, "increment", 1000);

    const response = await server.get(`/recommendations/top/${amount}`);

    const expectedRecommendations = await recommendationService.getTop(10);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedRecommendations);
    expect(response.body.length).toBeLessThanOrEqual(amount);
  });

  it("should return an array with top recommendations ordered by score descending", async () => {
    await createRecommendations();
    const amount = 3;

    await updateScoreRecommendation(1, "increment", 10);
    await updateScoreRecommendation(2, "increment", 100);
    await updateScoreRecommendation(3, "increment", 1000);

    const response = await server.get(`/recommendations/top/${amount}`);

    const expectedRecommendations = await recommendationService.getTop(amount);
    const expectedAllRecommendations =
      await recommendationRepository.getAmountByScore(amount);

    const expectedAllRecommendationsOrderedByScore =
      expectedAllRecommendations.sort((a, b) => b.score - a.score);

    expect(response.status).toBe(200);
    expect(expectedAllRecommendations).toEqual(expectedRecommendations);
    expect(response.body).toHaveLength(amount);
    expect(response.body).toEqual(expectedAllRecommendationsOrderedByScore);
    expect(response.body.length).toBeLessThanOrEqual(amount);
  });
});
