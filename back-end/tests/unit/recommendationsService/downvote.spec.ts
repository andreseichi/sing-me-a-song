import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";

beforeEach(async () => {
  jest.resetAllMocks();
});

describe("Downvote service", () => {
  it("should downvote a recommendation that has score greater than -5", async () => {
    const recommendation = {
      id: 1,
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
      score: 0,
    };
    const expectedRecommendation = {
      id: 1,
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
      score: -1,
    };

    jest
      .spyOn(recommendationService, "getById")
      .mockResolvedValueOnce(recommendation);
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(expectedRecommendation);
    jest.spyOn(recommendationRepository, "remove");

    await recommendationService.downvote(1);

    expect(recommendationRepository.updateScore).toHaveBeenCalledTimes(1);
    expect(recommendationRepository.remove).toHaveBeenCalledTimes(0);
  });

  it("should remove a recommendation that has score less than -5", async () => {
    const recommendation = {
      id: 1,
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
      score: -5,
    };

    const expectedRecommendation = {
      id: 1,
      name: "Test",
      youtubeLink: "https://www.youtube.com/watch?v=1",
      score: -6,
    };

    jest
      .spyOn(recommendationService, "getById")
      .mockResolvedValueOnce(recommendation);
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(expectedRecommendation);
    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    await recommendationService.downvote(1);

    expect(recommendationRepository.updateScore).toHaveBeenCalledTimes(1);
    expect(recommendationRepository.remove).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the recommendation does not exist", async () => {
    jest.spyOn(recommendationService, "getById");
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    const expectedThrow = {
      message: "",
      type: "not_found",
    };

    const promise = recommendationService.downvote(1);

    expect(promise).rejects.toEqual(expectedThrow);
    expect(recommendationRepository.updateScore).toHaveBeenCalledTimes(0);
    expect(recommendationRepository.remove).toHaveBeenCalledTimes(0);
  });
});
