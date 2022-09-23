import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import {
  CreateRecommendationData,
  recommendationService,
} from "../../../src/services/recommendationsService";

beforeEach(async () => {
  jest.resetAllMocks();
});

describe("Insert service", () => {
  it("should insert a new recommendation", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    const createRecommendationData: CreateRecommendationData = {
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
    };

    await recommendationService.insert(createRecommendationData);

    expect(recommendationRepository.create).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the name is already in use", async () => {
    jest.spyOn(recommendationRepository, "findByName").mockResolvedValueOnce({
      id: 1,
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
      score: 0,
    });
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce({} as any);

    const createRecommendationData: CreateRecommendationData = {
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
    };
    const expectedThrow = {
      message: "Recommendations names must be unique",
      type: "conflict",
    };

    const promise = recommendationService.insert(createRecommendationData);

    expect(promise).rejects.toEqual(expectedThrow);
    expect(recommendationRepository.create).toHaveBeenCalledTimes(0);
  });
});
