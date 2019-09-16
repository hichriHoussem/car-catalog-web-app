describe('CRA', () => {
  it('Should redirect to /new directory', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Add a car').click();
    cy.url() // 8.
      .should('include', '/new');
  });
});
