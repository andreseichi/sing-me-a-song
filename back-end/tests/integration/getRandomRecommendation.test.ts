import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
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

describe("route GET /recommendations/random", () => {
  it("should return a random recommendation with score greater than 10", async () => {
    const mockedRandom = 0.2;
    jest.spyOn(global.Math, "random").mockReturnValue(mockedRandom);

    const recommendationBody = recommendationBodyFactory();
    const secondRecommendationBody = recommendationBodyFactory();
    const thirdRecommendationBody = recommendationBodyFactory();

    await recommendationRepository.create(recommendationBody);
    await recommendationRepository.create(secondRecommendationBody);
    await recommendationRepository.create(thirdRecommendationBody);

    await updateScoreRecommendation(1, "increment", 10);
    await updateScoreRecommendation(2, "increment", 100);

    const response = await server.get("/recommendations/random");

    const expectedRecommendation = await recommendationService.getRandom();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        youtubeLink: expect.any(String),
        score: expect.any(Number),
      })
    );
    expect(expectedRecommendation.score).toBeGreaterThan(10);
  });

  it("should return a random recommendation with score less than or equal to 10 ", async () => {
    const mockedRandom = 0.9;
    jest.spyOn(global.Math, "random").mockReturnValue(mockedRandom);

    const recommendationBody = recommendationBodyFactory();
    const secondRecommendationBody = recommendationBodyFactory();
    const thirdRecommendationBody = recommendationBodyFactory();

    await recommendationRepository.create(recommendationBody);
    await recommendationRepository.create(secondRecommendationBody);
    await recommendationRepository.create(thirdRecommendationBody);

    await updateScoreRecommendation(1, "increment", 10);
    await updateScoreRecommendation(2, "increment", 100);

    const response = await server.get("/recommendations/random");

    const expectedRecommendation = await recommendationService.getRandom();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        youtubeLink: expect.any(String),
        score: expect.any(Number),
      })
    );
    expect(expectedRecommendation.score).toBeLessThanOrEqual(10);
  });

  it("should return a random recommendation if there is only recommendations with score less than or equal to 10", async () => {
    const mockedRandom = 0.9;
    jest.spyOn(global.Math, "random").mockReturnValue(mockedRandom);

    const recommendationBody = recommendationBodyFactory();
    const secondRecommendationBody = recommendationBodyFactory();
    const thirdRecommendationBody = recommendationBodyFactory();

    await recommendationRepository.create(recommendationBody);
    await recommendationRepository.create(secondRecommendationBody);
    await recommendationRepository.create(thirdRecommendationBody);

    await updateScoreRecommendation(1, "increment", 10);
    await updateScoreRecommendation(2, "increment", 3);
    await updateScoreRecommendation(3, "increment", 9);

    const response = await server.get("/recommendations/random");
    const expectedRecommendation = await recommendationService.getRandom();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        youtubeLink: expect.any(String),
        score: expect.any(Number),
      })
    );
    expect(expectedRecommendation.score).toBeLessThanOrEqual(10);
  });

  it("should return a random recommendation if there is only recommendations with score greater than 10", async () => {
    const mockedRandom = 0.2;
    jest.spyOn(global.Math, "random").mockReturnValue(mockedRandom);

    const recommendationBody = recommendationBodyFactory();
    const secondRecommendationBody = recommendationBodyFactory();
    const thirdRecommendationBody = recommendationBodyFactory();

    await recommendationRepository.create(recommendationBody);
    await recommendationRepository.create(secondRecommendationBody);
    await recommendationRepository.create(thirdRecommendationBody);

    await updateScoreRecommendation(1, "increment", 24);
    await updateScoreRecommendation(2, "increment", 100);
    await updateScoreRecommendation(3, "increment", 90);

    const response = await server.get("/recommendations/random");
    const expectedRecommendation = await recommendationService.getRandom();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        youtubeLink: expect.any(String),
        score: expect.any(Number),
      })
    );
    expect(expectedRecommendation.score).toBeGreaterThan(10);
  });
});
