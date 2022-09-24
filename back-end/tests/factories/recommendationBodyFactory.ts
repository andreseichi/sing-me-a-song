import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

export default function recommendationBodyFactory(): CreateRecommendationData {
  return {
    name: faker.lorem.words(4),
    youtubeLink: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  };
}
