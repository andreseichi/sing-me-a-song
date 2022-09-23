import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";

beforeEach(async () => {
  jest.resetAllMocks();
});

describe("Upvote service", () => {
  it("should upvote a recommendation", async () => {
    const recommendation = {
      id: 1,
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
      score: 0,
    };

    jest
      .spyOn(recommendationService, "getById")
      .mockResolvedValueOnce(recommendation);
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.upvote(1);

    expect(recommendationRepository.updateScore).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the recommendation does not exist", async () => {
    jest.spyOn(recommendationService, "getById");
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    const expectedThrow = {
      message: "",
      type: "not_found",
    };

    const promise = recommendationService.upvote(1);

    expect(promise).rejects.toEqual(expectedThrow);
    expect(recommendationRepository.updateScore).toHaveBeenCalledTimes(0);
  });
});
