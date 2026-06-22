describe('Login', () => {
  it('should login', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: 'jwt-token'
    }).as('login');

    cy.visit('/login');

    cy.get('[formControlName="login"]').type('john.doe');
    cy.get('[formControlName="password"]').type('password');

    cy.contains('button', 'Login').click();

    cy.wait('@login').its('request.body').should('deep.equal', {
      login: 'john.doe',
      password: 'password'
    });

    cy.contains('Authentication successful').should('be.visible');

    cy.window()
      .its('localStorage')
      .invoke('getItem', 'token')
      .should('equal', 'jwt-token');
  });

  it('should reset', () => {
    cy.visit('/login');

    cy.get('[formControlName="login"]').type('john.doe');
    cy.get('[formControlName="password"]').type('password');

    cy.contains('button', 'Cancel').click();

    cy.get('[formControlName="login"]').should('have.value', '');
    cy.get('[formControlName="password"]').should('have.value', '');
  });
});
