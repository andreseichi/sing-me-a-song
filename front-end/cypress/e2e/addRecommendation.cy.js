describe("empty spec", () => {
  it("passes", () => {
    cy.visit(Cypress.env("APP_URL"));
    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");
    cy.wait("@getRecommendations");
  });
});
