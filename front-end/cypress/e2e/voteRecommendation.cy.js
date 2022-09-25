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

    let recommendationVotes = 0;
    let updatedRecommendationVotes = 0;

    cy.get("[data-cy=recommendation]")
      .first()
      .then((recommendation) => {
        recommendationVotes = Cypress.$(recommendation)
          .find("[data-cy=recommendation-score]")
          .text();

        cy.get("[data-cy=upvote-button]").first().click();
        cy.wait("@getRecommendations", { timeout: 10000 });
      });

    cy.get("[data-cy=recommendation]")
      .first()
      .then((updatedRecommendation) => {
        updatedRecommendationVotes = Cypress.$(updatedRecommendation)
          .find("[data-cy=recommendation-score]")
          .text();

        expect(parseInt(updatedRecommendationVotes)).to.equal(
          parseInt(recommendationVotes) + 1
        );
      });
  });
});

describe("Downvote recommendation", () => {
  it("should be able to downvote a recommendation that has score above -4", () => {
    cy.visit(Cypress.env("APP_URL"));

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");

    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=recommendation]").should("have.length.at.most", 10);

    let recommendationVotes = 0;
    let updatedRecommendationVotes = 0;

    cy.get("[data-cy=recommendation]")
      .first()
      .then((recommendation) => {
        recommendationVotes = Cypress.$(recommendation)
          .find("[data-cy=recommendation-score]")
          .text();

        cy.get("[data-cy=downvote-button]").first().click();

        cy.wait("@getRecommendations", { timeout: 10000 });
        
        cy.get("[data-cy=recommendation]")
          .first()
          .then((updatedRecommendation) => {
            updatedRecommendationVotes = Cypress.$(updatedRecommendation)
              .find("[data-cy=recommendation-score]")
              .text();
    
            expect(parseInt(updatedRecommendationVotes)).to.equal(
              parseInt(recommendationVotes) - 1
            );
          });
      });


  });

  it("should remove a recommendation when downvote with score under -5", () => {
    cy.visit(Cypress.env("APP_URL"));

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");

    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=recommendation]").should("have.length.at.most", 10);

    let element;
    cy.get("[data-cy=recommendation]").then((recommendations) => {
      recommendations.each((index, recommendation) => {
        const recommendationVotes = Cypress.$(recommendation)
          .find("[data-cy=recommendation-score]")
          .text();

        if (parseInt(recommendationVotes) < -4) {
          element = recommendation;
          cy.get("[data-cy=downvote-button]").eq(index).click();

          cy.wait("@getRecommendations", { timeout: 10000 });

          cy.get("[data-cy=recommendation]").should("not.contain", element);
        }
      });
    });
  });
});
