Cypress.Commands.add("deleteDatabase", () => {
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/reset-database");
});

Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/reset-database");
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/seed");
});

beforeEach(() => {
  cy.resetDatabase();
});

describe("Top page", () => {
  it("should be able to visit the top page and see the top 10 recommendations", () => {
    cy.visit(Cypress.env("APP_URL") + "/top");

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations/top/10"
    ).as("getTopRecommendatins");

    cy.wait("@getTopRecommendatins", { timeout: 10000 });

    cy.get("[data-cy=recommendation]").should("have.length.at.most", 10);
  });

  it("should render top recommendations in order of score", () => {
    cy.visit(Cypress.env("APP_URL") + "/top");

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations/top/10"
    ).as("getTopRecommendatins");

    cy.wait("@getTopRecommendatins", { timeout: 100000 });

    cy.get("[data-cy=recommendation]").then((recommendations) => {
      const scores = [];
      recommendations.each((i, recommendation) => {
        scores.push(
          parseInt(
            Cypress.$(recommendation)
              .find("[data-cy=recommendation-score]")
              .text()
          )
        );
      });
      console.log(scores);
      expect(scores).to.deep.equal(scores.sort((a, b) => b - a));
    });
  });

  it("should be able to render header and menu", () => {
    cy.visit(Cypress.env("APP_URL") + "/top");

    cy.get("[data-cy=header]").should("exist");
    cy.get("[data-cy=menu]").should("exist");
  });

  it("should be able to render a message if there are no recommendation", () => {
    cy.deleteDatabase();

    cy.visit(Cypress.env("APP_URL") + "/top");

    cy.contains("No recommendations yet! Create your own :)").should("exist");
  });
});
