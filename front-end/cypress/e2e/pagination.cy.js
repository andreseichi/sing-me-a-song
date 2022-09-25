Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/reset-database");
});

beforeEach(() => {
  cy.resetDatabase();
});

describe("Pagination", () => {
  it("should be able to go to page /top", () => {
    cy.visit(Cypress.env("APP_URL"));

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");
    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=page-top]").click();

    cy.url().should("include", "/top");
  });

  it("should be able to go to page /random", () => {
    cy.visit(Cypress.env("APP_URL"));

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");
    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=page-random]").click();

    cy.url().should("include", "/random");
  });

  it("should be able to go to page /", () => {
    cy.visit(Cypress.env("APP_URL") + "/top");

    cy.get("[data-cy=page-home]").click();

    cy.url().should("include", "/");
  });
});
