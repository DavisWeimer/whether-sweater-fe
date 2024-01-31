describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.getWeather();
    cy.getBackground();
  });

  context('Exists', () => {
    it('renders correctly', () => {
      cy.get('section').should('exist');
      cy.get('img').should('be.visible');
      cy.contains('Log In').should('exist');
      cy.get('form').should('exist');
      cy.get('input[type="text"]').as('emailField').should('be.visible');
      cy.get('input[type="password"]').as('passwordField').should('be.visible');
      cy.get('button').contains('Submit').should('be.visible');
    });

    it('navigates to signup page on clicking Sign Up button', () => {
      cy.get('.inline-block').contains('Sign Up').click();
      cy.url().should('include', '/signup');
    });

    it('allows typing in the email and password fields', () => {
      const email = 'burrito@test.com';
      const password = 'password123';

      cy.get('input[type="text"]').as('emailField').type(email).should('have.value', email);
      cy.get('input[type="password"]').as('passwordField').type(password).should('have.value', password);
    });

    it('cannot be submitted when the email and password fields are empty', () => {
      cy.get('button:disabled').should('exist');
      cy.get('input[type="text"]').as('emailField').type('email');
      cy.get('button').contains('Submit').click();
      cy.url().should('include', '/login');
    });
  });

  context('Login', () => {
    it('allows a user to login when credentials are correct', () => {
      const email = 'weatherman@test.com';
      const password = 'password';
      
      cy.loginUser();

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[type="password"]').as('passwordField').type(password);
      cy.get('button').contains('Submit').click();
      cy.url().should('include', '/dashboard');
    });

    it('displays an error message when credentials are incorrect', () => {
      const email = 'weatherman@test.com';
      const password = 'wrongpassword';

      cy.intercept('POST', 'http://localhost:3000/login', {
        statusCode: 401,
        body: "Invalid Email or password.",
      }).as('loginUser');

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[type="password"]').as('passwordField').type(password);
      cy.get('button').contains('Submit').click();
      cy.url().should('include', '/login');
      cy.get('p.absolute').should('be.visible');
    });
  });

  context('Error Handling', () => {
    it('displays an error message when the server is down', () => {
      const email = 'weatherman@test.com';
      const password = 'password';

      cy.intercept('POST', 'http://localhost:3000/login', {
        forceNetworkError: true
      }).as('loginFail');

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[type="password"]').as('passwordField').type(password);
      cy.get('button').contains('Submit').click();
      cy.url().should('include', '/login');
      cy.get('p.absolute').should('be.visible');
    });

    it('displays an error message when the form is submitted (somehow) with missing input', () => {
      const email = 'weatherman@test.com';
      const password = 'password';

      cy.intercept('POST', 'http://localhost:3000/login', {
        statusCode: 400,
        body: {
          "status": {
            "code": 400,
            "message": "Missing Email or Password."
          }
        }
      }).as('loginFail');

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[type="password"]').as('passwordField').type(password);
      cy.get('button').contains('Submit').click();
      cy.url().should('include', '/login');
      cy.get('p.absolute').should('be.visible');
    });

    it ('displays and error when all else fails', () => {
      const email = 'weatherman@test.com';
      const password = 'password';

      cy.intercept('POST', 'http://localhost:3000/login', {
        statusCode: 418,
        body: {
          "status": {
            "code": 418,
            "message": "Login Failed."
          }
        }
      }).as('loginFail');

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[type="password"]').as('passwordField').type(password);
      cy.get('button').contains('Submit').click();
      cy.url().should('include', '/login');
      cy.get('p.absolute').should('be.visible');
    });
  });
});