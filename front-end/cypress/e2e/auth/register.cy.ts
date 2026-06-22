describe('Register', () => {
  it('should register', () => {
    cy.intercept('POST', '/api/register', {
      statusCode: 201,
      body: {}
    }).as('register');

    cy.visit('/register');

    cy.get('[formControlName="firstName"]').type('John');
    cy.get('[formControlName="lastName"]').type('Doe');
    cy.get('[formControlName="login"]').type('john.doe');
    cy.get('[formControlName="password"]').type('password');

    cy.contains('button', 'Register').click();

    cy.wait('@register').its('request.body').should('deep.equal', {
      firstName: 'John',
      lastName: 'Doe',
      login: 'john.doe',
      password: 'password'
    });

    cy.url().should('include', '/login');
  });
});
