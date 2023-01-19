/// <reference types="cypress" />

const baseUrl = Cypress.env("CYPRESS_BASE_URL");

const validCredentials = { email: "admin@gmail.com", password: "12345" };
const wrongCredentials = { email: "admin@gmail.com", password: "abc" };

describe("Authentication", () => {
  it("should redirect admin to login page if no authentication", () => {
    cy.visit(Cypress.env("admin_validation_url"));

    //testing redirection
    cy.url().should("be.equals", Cypress.env("login_url"));
  });

  it("test authentication and should display an error message", () => {
    cy.visit(Cypress.env("login_url"));

    //Trouve les champs du formulaire
    const emailField = cy.get("[data-test-id=email]");
    const passwordField = cy.get("[data-test-id=password]");

    //Trouve le bouton à presser
    const validateButton = cy.get("[data-test-id=button]");

    emailField.type(wrongCredentials.email);
    passwordField.type(wrongCredentials.password);

    validateButton.click();

    //Find error message
    cy.get("[data-test-id=snackbar-message]").should("exist");
  });

  it("test authentication and should redirect to admin", () => {
    cy.visit(Cypress.env("login_url"));

    //Trouve les champs du formulaire
    const emailField = cy.get("[data-test-id=email]");
    const passwordField = cy.get("[data-test-id=password]");

    //Trouve le bouton à presser
    const validateButton = cy.get("[data-test-id=button]");

    //Nettoie les anciennes valeurs saisies
    emailField.find("input").clear();
    passwordField.find("input").clear();

    //Saisie des bons crédentials
    emailField.type(validCredentials.email);
    passwordField.type(validCredentials.password);

    //press le bouton
    validateButton.click();

    cy.get("[data-test-id=snackbar-message]").should("not.exist");

    cy.url().should("be.equals", Cypress.env("admin_validation_url"));
  });
});
