let LOCAL_STORAGE_MEMORY = {};

describe('New Car Form Test', () => {
  beforeEach(() => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
      localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
  });

  afterEach(() => {
    Object.keys(localStorage).forEach(key => {
      LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
  });

  it('Should redirect to /new directory', function() {
    cy.visit('/');
    cy.contains('Add a car').click();
    cy.url().should('include', '/new');
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

    cy.get('.car-action')
      .eq(1)
      .find('button')
      .first()
      .click();

    cy.get('.list-element').should('contain', 'new car');
    cy.url().should('include', '/car/1');

    cy.visit('/');
    cy.get('.list-element').click();
    cy.url().should('include', '/car/1');
  });
  it('Should be able to add multiple cars', function() {
    [
      {
        model: 'model 1',
        manufacturer: 'manufacturer',
        co2: '100',
      },
      {
        model: 'model 2',
        manufacturer: 'manufacturer',
        co2: '200',
      },
      {
        model: 'model 3',
        manufacturer: 'manufacturer',
        co2: '300',
      },
      {
        model: 'model 4',
        manufacturer: 'manufacturer',
        co2: '400',
      },
    ].forEach((c, i) => {
      cy.visit('/');
      cy.contains('Add a car').click();

      cy.get('.car-field')
        .find('input.model')
        .type(c.model);

      cy.get('.car-field')
        .find('input.manufacturer')
        .type(c.manufacturer);

      cy.get('.car-field')
        .find('input.co2')
        .type(c.co2);

      cy.get('.car-action')
        .eq(1)
        .find('button')
        .first()
        .click();

      if (i === 3) {
        cy.get('.list-element').should('have.length', 5);
        cy.get('.list-element')
          .eq(1)
          .should('contain', 'model 1');
        cy.url().should('include', '/car/5');
      }
    });
  });

  it('Should be able to edit a car details', function() {
    cy.get('.car-action')
      .eq(1)
      .find('button')
      .first()
      .click();

    cy.get('.car-field')
      .find('input.model')
      .type(' modified');

    cy.get('.car-field')
      .find('input.manufacturer')
      .type(' modified');

    cy.get('.car-field')
      .find('input.co2')
      .type('0');

    cy.get('.car-action')
      .eq(1)
      .find('button')
      .first()
      .click();

    cy.get('.list-element').should('have.length', 5);
    cy.get('.list-element')
      .eq(4)
      .should('contain', 'model 4 modified');
    cy.url().should('include', '/car/5');
  });

  it('Should be able to remove a car from the list', function() {
    cy.get('.car-action')
      .eq(1)
      .find('button')
      .eq(1)
      .click();

    cy.get('.list-element').should('have.length', 4);
  });

  it('Should be able to remove multiple cars', function() {
    cy.get('.list-element')
      .eq(3)
      .click();

    cy.get('.car-action')
      .eq(1)
      .find('button')
      .eq(1)
      .click();

    cy.get('.list-element')
      .eq(2)
      .click();

    cy.get('.car-action')
      .eq(1)
      .find('button')
      .eq(1)
      .click();

    cy.get('.list-element').should('have.length', 2);
  });
});
