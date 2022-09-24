import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";

beforeEach(async () => {
  jest.resetAllMocks();
  jest.resetModules();
  jest.clearAllMocks();
});

describe("getRandom service", () => {
  it("should return a random recommendation with score greater than 10", async () => {
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
        score: 25,
      },
      {
        id: 3,
        name: "Test 3",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 15,
      },
    ];
    const expectedRecommendations = [
      {
        id: 2,
        name: "Test 2",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 25,
      },
      {
        id: 3,
        name: "Test 3",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 15,
      },
    ];
    const mockedRandom = 0.9;

    const randomSpy = jest
      .spyOn(global.Math, "random")
      .mockReturnValue(mockedRandom);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(recommendations);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(expectedRecommendations);

    const result = await recommendationService.getRandom();

    expect(randomSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      youtubeLink: expect.any(String),
      score: expect.any(Number),
    });
    expect(result.score).toBeGreaterThan(10);
    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return a random recommendation with score less than or equal to 10", async () => {
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
        score: 25,
      },
      {
        id: 3,
        name: "Test 3",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 15,
      },
    ];
    const expectedRecommendations = [
      {
        id: 1,
        name: "Test",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 0,
      },
    ];
    const mockedRandom = 0.2;

    const randomSpy = jest
      .spyOn(global.Math, "random")
      .mockReturnValue(mockedRandom);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(recommendations);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(expectedRecommendations);

    const result = await recommendationService.getRandom();

    expect(randomSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      youtubeLink: expect.any(String),
      score: expect.any(Number),
    });
    expect(result.score).toBeLessThanOrEqual(10);
    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return a random recommendation if there are no recommendations with score greater than 10", async () => {
    const expectedRecommendations = [
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
        score: 5,
      },
      {
        id: 3,
        name: "Test 3",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 10,
      },
    ];
    const mockedRandom = 0.9;

    const randomSpy = jest
      .spyOn(global.Math, "random")
      .mockReturnValue(mockedRandom);
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(expectedRecommendations);

    const result = await recommendationService.getRandom();

    expect(randomSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      youtubeLink: expect.any(String),
      score: expect.any(Number),
    });
    expect(result.score).toBeLessThanOrEqual(10);
    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(2);
  });

  it("should return a random recommendation if there are no recommendations with score less than or equal to 10", async () => {
    const expectedRecommendations = [
      {
        id: 1,
        name: "Test",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 15,
      },
      {
        id: 2,
        name: "Test 2",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 20,
      },
      {
        id: 3,
        name: "Test 3",
        youtubeLink: "https://www.youtube.com/watch?v=1",
        score: 25,
      },
    ];
    const mockedRandom = 0.2;

    const randomSpy = jest
      .spyOn(global.Math, "random")
      .mockReturnValue(mockedRandom);
    jest;
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(expectedRecommendations);

    const result = await recommendationService.getRandom();

    expect(randomSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      youtubeLink: expect.any(String),
      score: expect.any(Number),
    });
    expect(result.score).toBeGreaterThan(10);
    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(2);
  });
});
