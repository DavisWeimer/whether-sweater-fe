describe('Welcome Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('renders correctly', () => {
    cy.get('section').should('exist');
    cy.get('img').should('be.visible');
    cy.contains('Welcome!').should('exist');
  });

  it('navigates to login page on clicking Log In button', () => {
    cy.get('button').contains('Log In').click();
    cy.url().should('include', '/login');
  });

  it('navigates to signup page on clicking Sign Up button', () => {
    cy.get('button').contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });

});