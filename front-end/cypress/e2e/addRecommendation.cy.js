Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", Cypress.env("REACT_APP_API_BASE_URL") + "/reset-database");
});

beforeEach(() => {
  cy.resetDatabase();
});

describe("Add recommendation ", () => {
  it("should add a new recommendation", () => {
    cy.visit(Cypress.env("APP_URL"));
    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");
    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=name-input]").type("Recommendation video name");
    cy.get("[data-cy=link-input]").type(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
    cy.get("[data-cy=submit-button]").click();

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");

    cy.wait("@getRecommendations").then((interception) => {
      expect(interception.response.body).to.have.lengthOf(1);
    });

    cy.get("[data-cy=recommendation]").should("have.length", 1);
  });

  it("should not add a new recommendation with repeated name", () => {
    cy.visit(Cypress.env("APP_URL"));
    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");
    cy.wait("@getRecommendations", { timeout: 10000 });

    cy.get("[data-cy=name-input]").type("Recommendation video name");
    cy.get("[data-cy=link-input]").type(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
    cy.get("[data-cy=submit-button]").click();

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");

    cy.wait("@getRecommendations").then((interception) => {
      expect(interception.response.body).to.have.lengthOf(1);
    });

    cy.get("[data-cy=recommendation]").should("have.length", 1);

    cy.get("[data-cy=name-input]").type("Recommendation video name");
    cy.get("[data-cy=link-input]").type(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
    cy.get("[data-cy=submit-button]").click();

    cy.intercept(
      "GET",
      Cypress.env("REACT_APP_API_BASE_URL") + "/recommendations"
    ).as("getRecommendations");

    cy.wait("@getRecommendations").then((interception) => {
      expect(interception.response.body).to.have.lengthOf(1);
    });

    cy.get("[data-cy=recommendation]").should("have.length", 1);

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Error creating recommendation!");
    });
  });
});
