describe('New Car Form Test', () => {
  it('Should redirect to /new directory', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Add a car').click();
    cy.url() // 8.
      .should('include', '/new');
  });
  it('Should redirect to /new directory', function() {
    cy.get('.car-field')
      .first()
      .find('label')
      .should('contain', 'model');
  });
});
