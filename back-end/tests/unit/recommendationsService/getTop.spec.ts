import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";

beforeEach(async () => {
  jest.resetAllMocks();
});

describe("getTop service", () => {
  it("should return a list of recommendations ordered by score", async () => {
    const expectedRecommendations = [
      {
        id: 2,
        name: "Test 2",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 10,
      },
      {
        id: 1,
        name: "Test",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 0,
      },
      {
        id: 3,
        name: "Test 3",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: -2,
      },
    ];

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValueOnce(expectedRecommendations);

    const result = await recommendationService.getTop(10);

    expect(result).toEqual(expectedRecommendations);
    expect(recommendationRepository.getAmountByScore).toHaveBeenCalledTimes(1);
  });
});
