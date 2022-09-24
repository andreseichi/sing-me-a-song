import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import createRecommendations from "../factories/createRecommendationsFactory";
import recommendationBodyFactory from "../factories/recommendationBodyFactory";
import { deleteAllData } from "../factories/scenarioFactory";

beforeEach(async () => {
  await deleteAllData();
  jest.resetAllMocks();
});

afterAll(async () => {
  prisma.$disconnect();
});

const server = supertest(app);

describe("middlewares", () => {
  it("should return status 422 if name is not a string", async () => {
    const recommendationBody = recommendationBodyFactory();
    const recommendationBodyInvalid = {
      ...recommendationBody,
      name: 123,
    };

    const response = await server
      .post("/recommendations")
      .send(recommendationBodyInvalid);

    expect(response.status).toBe(422);
  });

  it("should return status 422 if youtubeLink is not a valid youtube string", async () => {
    const recommendationBody = recommendationBodyFactory();
    const recommendationBodyInvalid = {
      ...recommendationBody,
      youtubeLink: "invalid yutube link",
    };

    const response = await server
      .post("/recommendations")
      .send(recommendationBodyInvalid);

    expect(response.status).toBe(422);
  });

  it("should return status 500 if there is an error in the database", async () => {
    const recommendationBody = recommendationBodyFactory();
    jest.spyOn(recommendationRepository, "create").mockImplementation(() => {
      throw new Error();
    });

    const response = await server
      .post("/recommendations")
      .send(recommendationBody);

    expect(response.status).toBe(500);
  });
});
