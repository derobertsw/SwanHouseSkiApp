/// <reference types="cypress" />

describe('HomePage:', function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit('/');
    cy.waitForReact();
  });

  describe('Navigation:', () => {
    it('allows a user to navigate to sign up', () => {
      cy.get('a[href*="signup"]').click();
      cy.url().should('contain', '/signup');
    });

    it('allows a user to navigate to sign in', () => {
      cy.get('a[href*="signin"]').click();
      cy.url().should('contain', '/signin');
    });
  });
});
