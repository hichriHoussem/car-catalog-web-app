describe('New Car Form Test', () => {
  it('Should redirect to /new directory', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Add a car').click();
    cy.url() // 8.
      .should('include', '/new');
  });
  it('Should display new cars form', function() {
    cy.get('.car-field')
      .first()
      .find('label')
      .should('contain', 'model');

    cy.get('.car-field').should('have.length', 5);
  });

  it('Should be able to add a new car', function() {
    cy.get('.car-field')
      .first()
      .find('input')
      .type('new car');
    cy.get('.car-field')
      .eq(1)
      .first()
      .find('input')
      .type('new car');
    cy.get('.car-field')
      .eq(3)
      .first()
      .find('input')
      .type('200');
    cy.get('.car-field')
      .eq(4)
      .first()
      .find('input')
      .type('image link');

    cy.get('.car-action')
      .eq(1)
      .find('button')
      .first()
      .click();

    cy.get('.list-element').should('contain', 'new car');
    cy.url().should('include', '/car/1');

    cy.visit('http://localhost:3000');
    cy.get('.list-element').click();
    cy.url().should('include', '/car/1');
  });
});
