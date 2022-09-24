import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import createRecommendations from "../factories/createRecommendationsFactory";
import { deleteAllData } from "../factories/scenarioFactory";

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  prisma.$disconnect();
});

const server = supertest(app);

describe("route POST /recommendations/:id/upvote", () => {
  it("should return status 200 and increment the score of the recommendation by 1", async () => {
    const recommendations = await createRecommendations();
    const idRecommendation = recommendations[0].id;
    const recommendationName = recommendations[0].name;

    const response = await server.post(
      `/recommendations/${idRecommendation}/upvote`
    );

    const recommendationDB = await recommendationRepository.findByName(
      recommendationName
    );

    expect(response.status).toBe(200);
    expect(recommendationDB?.score).toBe(recommendations[0].score + 1);
  });

  it("should return status 404 if recommendation does not exist", async () => {
    const idRecommendation = -1;

    const response = await server.post(
      `/recommendations/${idRecommendation}/upvote`
    );

    expect(response.status).toBe(404);
  });
});
