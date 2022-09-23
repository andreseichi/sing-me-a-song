import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";

beforeEach(async () => {
  jest.resetAllMocks();
});

describe("get service", () => {
  it("should return a list of recommendations", async () => {
    const recommendations = [
      {
        id: 1,
        name: "Test",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 0,
      },
      {
        id: 2,
        name: "Test 2",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 10,
      },
    ];

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(recommendations);

    const result = await recommendationService.get();

    expect(result).toEqual(recommendations);
    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
