describe('Student list', () => {
  it('should display students', () => {
    cy.intercept('GET', '/api/students', {
      statusCode: 200,
      body: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com'
        }
      ]
    }).as('students');

    cy.visit('/students', {
      onBeforeLoad(window) {
        window.localStorage.setItem('token', 'jwt-token');
      }
    });

    cy.wait('@students');

    cy.contains('John').should('be.visible');
    cy.contains('john.doe@example.com').should('be.visible');
    cy.contains('Jane').should('be.visible');
    cy.contains('jane.doe@example.com').should('be.visible');
  });

  it('should delete student', () => {
    cy.intercept('GET', '/api/students', {
      statusCode: 200,
      body: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        }
      ]
    }).as('students');

    cy.intercept('DELETE', '/api/students/1', {
      statusCode: 204
    }).as('deleteStudent');

    cy.visit('/students', {
      onBeforeLoad(window) {
        window.localStorage.setItem('token', 'jwt-token');
      }
    });

    cy.wait('@students');

    cy.on('window:confirm', () => true);

    cy.contains('button', 'Delete').click();

    cy.wait('@deleteStudent');

    cy.contains('Student deleted successfully').should('be.visible');
    cy.contains('john.doe@example.com').should('not.exist');
  });
});
