describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signup');
  });

  context('Exists', () => {
    it('renders correctly', () => {
      cy.get('section').should('exist');
      cy.get('img').should('be.visible');
      cy.contains('Sign Up').should('exist');
      cy.get('form').should('exist');
      cy.get('input[type="text"]').as('emailField').should('be.visible');
      cy.get('input[type="password"]').as('passwordField').should('be.visible');
      cy.get('button').contains('Sign Up').should('be.visible');
    });

    it('navigates to login page on clicking Log In button', () => {
      cy.get('.inline-block').contains('Sign In').click();
      cy.url().should('include', '/login');
    });

    it('allows typing in the email and password fields', () => {
      const email = 'tacos@test.com';
      const password = '12345!aA';

      cy.get('input[type="text"]').as('emailField').type(email).should('have.value', email);
      cy.get('input[id="password"]').as('passwordField').type(password).should('have.value', password);
      cy.get('input[id="confirm_pwd"]').as('passwordField').type(password).should('have.value', password);
    });

    it('cannot be submitted when the email and password fields are empty', () => {
      cy.get('button:disabled').should('exist');
      cy.get('input[type="text"]').as('emailField').type('email');
      cy.get('input[id="confirm_pwd"]').as('passwordField').type('password').should('have.value', 'password');
      cy.get('button:disabled').contains('Sign Up').should('exist');
      cy.url().should('include', '/signup');
    });
  });

  context('Register', () => {
    it('allows a user to register when credentials are correct', () => {
      const email = 'weatherman@test.com';
      const password = '12345!aA';
      
      cy.registerUser();

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[id="password"]').as('passwordField').type(password);
      cy.get('input[id="confirm_pwd"]').as('passwordField').type(password);
      cy.get('button').contains('Sign Up').click();
      cy.url().should('include', '/signup');
      cy.get('h1').contains('Signed up sucessfully').should('exist');
      cy.get('button').contains('Log In').should('exist');
    });

    it('displays an error message when email is incorrect', () => {
      const email = 'this is not an email...';
      const password = '12345!aA';

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('p[id="emailnote"]').contains('Must be a valid email address. Example: user@example.com').should('exist');
      cy.url().should('include', '/signup');
      cy.get('button:disabled').contains('Sign Up').should('exist');
    });

    it('displays an error message when password is incorrect', () => {
      const email = 'weatherman@test.com';
      const password = 'password12345';

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[id="password"]').as('passwordField').type(password);

      cy.get('p[id="pwdnote"]').contains('8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character.').should('exist');
      cy.url().should('include', '/signup');
      cy.get('button:disabled').contains('Sign Up').should('exist');
    });

    it('displays an error message when passwords do not match', () => {
      const email = 'weatherman@test.com';
      const password = '12345!aA';
      const confirmPassword = 'what did I type again?';

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[id="password"]').as('passwordField').type(password);
      cy.get('input[id="confirm_pwd"]').as('passwordField').type(confirmPassword);
      
      cy.get('p[id="confirmnote"]').contains('Must match the first password input field.').should('exist');
      cy.url().should('include', '/signup');
      cy.get('button:disabled').contains('Sign Up').should('exist');
    });
  });

  context('Error Handling', () => {
    it('displays an error message when the server is down', () => {
      const email = 'weatherman@test.com';
      const password = '12345!aA';

      cy.intercept('POST', 'http://localhost:3000/signup', {
        forceNetworkError: true
      }).as('loginFail');

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[id="password"]').as('passwordField').type(password);
      cy.get('input[id="confirm_pwd"]').as('passwordField').type(password);
      cy.get('button').contains('Sign Up').click();
      cy.url().should('include', '/signup');
      cy.get('p.absolute').contains('No Server Response').should('be.visible');
    });

    it('displays an error message when the form is submitted with taken email', () => {
      const email = 'weatherman@test.com';
      const password = '12345!aA';

      cy.intercept('POST', 'http://localhost:3000/signup', {
        statusCode: 409,
        body: {
          "status": {
            "code": 409,
            "message": "Email Taken"
          }
        }
      }).as('loginFail');

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[id="password"]').as('passwordField').type(password);
      cy.get('input[id="confirm_pwd"]').as('passwordField').type(password);
      cy.get('button').contains('Sign Up').click();
      cy.url().should('include', '/signup');
      cy.get('p.absolute').contains('Email Taken').should('be.visible');
    });

    it('displays an error message when all else fails', () => {
      const email = 'weatherman@test.com';
      const password = '12345!aA';

      cy.intercept('POST', 'http://localhost:3000/signup', {
        statusCode: 418,
        body: {
          "status": {
            "code": 418,
            "message": "Registration Failed"
          }
        }
      }).as('loginFail');

      cy.get('input[type="text"]').as('emailField').type(email);
      cy.get('input[id="password"]').as('passwordField').type(password);
      cy.get('input[id="confirm_pwd"]').as('passwordField').type(password);
      cy.get('button').contains('Sign Up').click();
      cy.url().should('include', '/signup');
      cy.get('p.absolute').contains('Registration Failed').should('be.visible');
    });
  });
});