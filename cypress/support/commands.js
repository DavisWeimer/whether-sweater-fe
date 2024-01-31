Cypress.Commands.add('registerUser', () => {
  cy.intercept('POST', 'http://localhost:3000/signup', {
    statusCode: 200,
    body: {
      "status": {
        "code": 200,
        "message": "Signed up sucessfully."
      },
      "data": {
        "id": 4,
        "email": "burrito@test.com",
        "created_at": "2024-01-30T18:14:33.203Z",
        "created_date": "01/30/2024"
      }
    },
  }).as('resgisterUser');
});

Cypress.Commands.add('loginUser', () => {
  cy.intercept('POST', 'http://localhost:3000/login', {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "authorization": "Bearer McToken",
      "Access-Control-Expose-Headers": "access-token, expiry, token-type, Authorization",
    },
    body: {
      "data": {
        "status": {
          "code": 200,
          "message": "Logged in successfully."
        },
        "data": {
          "id": 5,
          "email": "weatherman@test.com",
          "created_at": "2024-01-30T20:16:23.788Z",
          "created_date": "01/30/2024"
        }
      }
    }
  }).as('loginUser');
});

Cypress.Commands.add('logoutUser', () => {
  cy.intercept('DELETE', 'http://localhost:3000/logout', {
    statusCode: 200,
    body: {
      "status": 200,
      "message": "Logged out successfully."
    },
  }).as('logoutUser');
});

Cypress.Commands.add('getWeather', () => {
  cy.intercept('GET', 'http://localhost:3000/api/v0/forecast?location=Denver,+CO', {
    statusCode: 200,
    fixture: 'weather.json',
  }).as('getWeather');
});

Cypress.Commands.add('getBackground', () => {
  cy.intercept('GET', 'http://localhost:3000/api/v0/backgrounds?location=Denver,+CO', {
    statusCode: 200,
    fixture: 'background.json',
  }).as('getBackground');
});

Cypress.Commands.add('createRoadtrip', () => {
  cy.intercept('POST', 'http://localhost:3000/api/v0/road_trips', {
    statusCode: 200,
    fixture: 'roadtrip.json',
  }).as('createRoadtrip');
});

