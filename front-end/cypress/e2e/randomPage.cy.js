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

describe("Random page", () => {
  it("should be able to visit the random page and see a random recommendation", () => {
    cy.visit(Cypress.env("APP_URL") + "/random");

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations/random"
    ).as("getRecommendations");

    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=recommendation]").should("have.length", 1);
  });

  it("should be able to render header and menu", () => {
    cy.visit(Cypress.env("APP_URL") + "/random");

    cy.get("[data-cy=header]").should("exist");
    cy.get("[data-cy=menu]").should("exist");
  });
});
