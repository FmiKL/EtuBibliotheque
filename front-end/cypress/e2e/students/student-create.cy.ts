describe('Create student', () => {
  it('should create student', () => {
    cy.intercept('POST', '/api/students', {
      statusCode: 201,
      body: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      }
    }).as('createStudent');

    cy.intercept('GET', '/api/students/1', {
      statusCode: 200,
      body: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      }
    }).as('student');

    cy.visit('/students/new', {
      onBeforeLoad(window) {
        window.localStorage.setItem('token', 'jwt-token');
      }
    });

    cy.get('[formControlName="firstName"]').type('John');
    cy.get('[formControlName="lastName"]').type('Doe');
    cy.get('[formControlName="email"]').type('john.doe@example.com');

    cy.contains('button', 'Create').click();

    cy.wait('@createStudent').its('request.body').should('deep.equal', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });

    cy.url().should('include', '/students/1');
    cy.wait('@student');
  });
});
