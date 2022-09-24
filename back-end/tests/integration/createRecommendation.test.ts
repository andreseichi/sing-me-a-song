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

describe("route POST /recommendations", () => {
  it("should answer with status 422 for invalid body", async () => {
    const recommendationBody = recommendationBodyFactory();
    const recommendationBodyWithInvalidYoutubeLink = {
      ...recommendationBody,
      youtubeLink: "invalid youtube link",
    };

    const response = await server
      .post("/recommendations")
      .send(recommendationBodyWithInvalidYoutubeLink);

    expect(response.status).toEqual(422);
    expect(response.body).toEqual({});
  });

  it("should answer with status 201 for valid body and unique name", async () => {
    const recommendationBody = recommendationBodyFactory();
    const secondRecommendationBody = recommendationBodyFactory();

    await recommendationRepository.create(recommendationBody);

    const response = await server
      .post("/recommendations")
      .send(secondRecommendationBody);

    const expectRecommendationDB = await recommendationRepository.findByName(
      secondRecommendationBody.name
    );

    expect(expectRecommendationDB).toEqual(
      expect.objectContaining({
        name: secondRecommendationBody.name,
        youtubeLink: secondRecommendationBody.youtubeLink,
      })
    );
    expect(response.status).toEqual(201);
  });

  it("should answer with status 409 for valid body and non-unique name", async () => {
    const recommendationBody = recommendationBodyFactory();

    await recommendationRepository.create(recommendationBody);

    const response = await server
      .post("/recommendations")
      .send(recommendationBody);

    expect(response.status).toEqual(409);
  });
});
