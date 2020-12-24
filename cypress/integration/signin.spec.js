/// <reference types="cypress" />

describe('Signin Page:', function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit('/signin');
    cy.waitForReact();
  });

  describe('Sign in', () => {
    it('allows a user to sign in', () => {
      cy.get('#email').type(testUser.email);
      cy.get('#password').type(testUser.password);
      cy.get('[type="submit"]').click();

      // Assertion
      cy.url().should('contain', '/home');
    });

    it('allows a user to sign out', () => {
      cy.get('#signout').click();

      // Assertion
      cy.url().should('contain', '/signin');
    });
  });
});

const testUser = {
  name: 'Dummy',
  email: 'dummy@gmail.com',
  password: 'hunter2',
};
