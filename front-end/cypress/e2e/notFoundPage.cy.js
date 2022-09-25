Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/reset-database");
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/seed");
});

beforeEach(() => {
  cy.resetDatabase();
});

describe("Not found Page", () => {
  it("should be able to visit a non-existing page and see the not found page", () => {
    cy.visit(Cypress.env("APP_URL") + "/non-existing-page");

    cy.get("[data-cy=not-found]").should("exist");
  });
});
