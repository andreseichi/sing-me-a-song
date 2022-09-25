Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/reset-database");
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/seed");
});

beforeEach(() => {
  cy.resetDatabase();
});

describe("Upvote recommendation", () => {
  it("should be able to upvote a recommendation", () => {
    cy.visit(Cypress.env("APP_URL"));

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");

    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=recommendation]").should("have.length.at.most", 10);

    cy.get("[data-cy=recommendation]")
      .first()
      .then((recommendation) => {
        const recommendationVotes = Cypress.$(recommendation)
          .find("[data-cy=recommendation-score]")
          .text();

        cy.get("[data-cy=upvote-button]").first().click();

        cy.get("[data-cy=recommendation]")
          .first()
          .then((updatedRecommendation) => {
            const updatedRecommendationVotes = Cypress.$(updatedRecommendation)
              .find("[data-cy=recommendation-score]")
              .text();

            expect(parseInt(updatedRecommendationVotes)).to.equal(
              parseInt(recommendationVotes) + 1
            );
          });
      });
  });
});
