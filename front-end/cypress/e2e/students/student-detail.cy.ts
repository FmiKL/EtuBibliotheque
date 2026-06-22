describe('Student detail', () => {
  it('should display student', () => {
    cy.intercept('GET', '/api/students/1', {
      statusCode: 200,
      body: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      }
    }).as('student');

    cy.visit('/students/1', {
      onBeforeLoad(window) {
        window.localStorage.setItem('token', 'jwt-token');
      }
    });

    cy.wait('@student');

    cy.contains('Student detail').should('be.visible');
    cy.contains('John').should('be.visible');
    cy.contains('Doe').should('be.visible');
    cy.contains('john.doe@example.com').should('be.visible');
  });
});
