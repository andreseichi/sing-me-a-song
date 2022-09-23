import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";

beforeEach(async () => {
  jest.resetAllMocks();
});

describe("getById service", () => {
  it("should return a recommendation by id", async () => {
    const recommendation = {
      id: 1,
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
      score: 0,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);

    const result = await recommendationService.getById(1);

    expect(result).toEqual(recommendation);
    expect(recommendationRepository.find).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the recommendation does not exist", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    const expectedThrow = {
      message: "",
      type: "not_found",
    };

    const promise = recommendationService.getById(1);

    expect(promise).rejects.toEqual(expectedThrow);
  });
});
