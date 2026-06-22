describe('Edit student', () => {
  it('should update student', () => {
    cy.intercept('GET', '/api/students/1', {
      statusCode: 200,
      body: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      }
    }).as('student');

    cy.intercept('PUT', '/api/students/1', {
      statusCode: 200,
      body: {
        id: 1,
        firstName: 'John',
        lastName: 'Doeaze',
        email: 'john.doeaze@example.com'
      }
    }).as('updateStudent');

    cy.visit('/students/1/edit', {
      onBeforeLoad(window) {
        window.localStorage.setItem('token', 'jwt-token');
      }
    });

    cy.wait('@student');

    cy.get('[formControlName="lastName"]').clear().type('Doeaze');
    cy.get('[formControlName="email"]')
      .clear()
      .type('john.doeaze@example.com');

    cy.contains('button', 'Update').click();

    cy.wait('@updateStudent').its('request.body').should('deep.equal', {
      firstName: 'John',
      lastName: 'Doeaze',
      email: 'john.doeaze@example.com'
    });

    cy.url().should('include', '/students/1');
    cy.wait('@student');
  });
});
