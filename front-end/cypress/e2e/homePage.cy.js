Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/reset-database");
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/seed");
});

beforeEach(() => {
  cy.resetDatabase();
});

describe("Home page", () => {
  it("should be able to visit the home page and see the recommendations", () => {
    cy.visit(Cypress.env("APP_URL"));

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");

    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=recommendation]").should("have.length.at.least", 1);
  });

  it("should be able to render header and menu", () => {
    cy.visit(Cypress.env("APP_URL"));

    cy.get("[data-cy=header]").should("exist");
    cy.get("[data-cy=menu]").should("exist");
  });

  it("should render max of 10 recommendations", () => {
    cy.visit(Cypress.env("APP_URL"));

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");

    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=recommendation]").should("have.length.at.most", 10);
  });
});
