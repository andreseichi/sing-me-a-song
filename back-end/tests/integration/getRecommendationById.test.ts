import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import createRecommendations from "../factories/createRecommendationsFactory";
import recommendationBodyFactory from "../factories/recommendationBodyFactory";
import { deleteAllData } from "../factories/scenarioFactory";

beforeEach(async () => {
  await deleteAllData();
});

afterAll(async () => {
  prisma.$disconnect();
});

const server = supertest(app);

describe("route GET /recommendations/:id", () => {
  it("should return a recommendation by id", async () => {
    const recommendations = await createRecommendations();
    const idRecommendation = recommendations[2].id;

    const response = await server.get(`/recommendations/${idRecommendation}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        youtubeLink: expect.any(String),
        score: expect.any(Number),
      })
    );
    expect(response.body.id).toBe(idRecommendation);
  });

  it("should return status 404 if recommendation does not exist", async () => {
    const idRecommendation = -1;

    const response = await server.get(`/recommendations/${idRecommendation}`);

    expect(response.status).toBe(404);
  });
});
