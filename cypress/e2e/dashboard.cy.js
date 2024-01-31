describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.userToDashboard();
  });

  context('Exists', () => {
    it('renders correctly', () => {
      // NavBar
      cy.get('img[alt="Whether Logo"]').should('exist');
      cy.get('button').contains('Location').should('exist');
      cy.get('button').contains('Logout').should('exist');

      // Daily
      cy.get('section.justify-evenly.items-center.inline-flex').should('exist');
      cy.get('div.border-turquiose.rounded-full').should('exist');
      cy.get('div.text-offWhite.font-bold').contains('Partly cloudy').should('exist');
      cy.contains('div', 'Feels Like:').should('exist');
      cy.get('div.border-r-2.border-turquiose').should('exist');
      cy.get('div.font-dm-sans-bold').contains('°').first().should('exist');
      cy.get('div.text-xl').contains('Denver, CO').should('exist');
      cy.get('div').contains('Jan 30 11:15 AM')
      cy.get('div.text-6xl').contains('51.4°').should('exist');
      cy.get('span').contains('57.8°').should('exist');
      cy.get('span').contains('38.2°').should('exist');

      // Roadtrips
      cy.get('img[alt="Road Trip Logo"]').should('exist');
      cy.get('form.flex-1').should('exist');
      cy.get('input#origin').should('exist');
      cy.get('input#destination').should('exist');
      cy.get('button:disabled').contains('Submit')
      cy.get('img[alt="bg-img"]').should('exist');
    });

    it('cannot navigate to /login when authenticated', () => {
      cy.visit('http://localhost:5173/login');
      cy.url().should('include', '/dashboard');
    });
  });

  context('NavBar', () => {
    it('displays locationSearch when clicking Location button', () => {
      cy.get('button').contains('Location').click();
      cy.get('.react-select-container').contains('Select...').should('exist');
      cy.get('.bg-darkGray').should('exist');
    });

    it('close locationSearch when clicking Xing out of locationSearch', () => {
      cy.get('button').contains('Location').click();
      cy.get('.absolute').click();
      cy.get('.react-select-container').should('not.exist');
    });

    it('changes location when new location is selected and submitted', () => {
      cy.getNYCWeather();
      cy.getNYCBackground();

      cy.get('button').contains('Location').click();
      cy.get('.react-select-container').type('New York{enter}');
      cy.get('.bg-darkGray').click();
      cy.get('div.text-xl').contains('New York City, NY').should('exist');
    });

    it('logs out when clicking Logout button', () => {
      cy.logoutUser();
      cy.get('button').contains('Logout').click();
      cy.url().should('include', '/login');
    });
  });

  context('Road Trip Planner', () => {
    it('displays roadtrip results when submitting form', () => {
      cy.createRoadtrip();

      cy.get('input#origin').type('Denver, CO');
      cy.get('input#destination').type('New York City, NY');
      cy.get('button').contains('Submit').click();
      cy.get('div').contains('New York City, NY').should('exist');
      cy.get('div').contains('Denver, CO').should('exist');
      cy.get('div').contains('24 hrs 54 mins').should('exist');
      cy.get('div').contains('Overcast, 39°').should('exist');
    });

    it('displays roadtrip results when submitting form with impossible locations', () => {
      cy.noGoRoadtrip();

      cy.get('input#origin').type('Denver, CO');
      cy.get('input#destination').type('khjashkjfadjkhfad');
      cy.get('button').contains('Submit').click();
      cy.get('div').contains('khjashkjfadjkhfad').should('exist');
      cy.get('div').contains('Denver, CO').should('exist');
      cy.get('div').contains('Impossible').should('exist');
      cy.get('div').contains('N/A').should('exist');
    });

    it('displays an error message when origin or destination is missing', () => {
      cy.intercept('POST', 'http://localhost:3000/api/v0/road_trips', {
        statusCode: 422,
        body: "Missing Origin or Destination",
      }).as('createRoadtrip');

      cy.get('input#origin').type('asdasdasd');
      cy.get('input#destination').type('lkjhlkjhlkjh');
      cy.get('button').contains('Submit').click();
      cy.get('.flex-1 > .shadow-md').contains('Missing Origin or Destination').should('exist');
    });

    it('displays an error message when server is down', () => {
      cy.intercept('POST', 'http://localhost:3000/api/v0/road_trips', {
        forceNetworkError: true
      }).as('loginFail');

      cy.get('input#origin').type('asdasdasd');
      cy.get('input#destination').type('lkjhlkjhlkjh');
      cy.get('button').contains('Submit').click();
      cy.get('.flex-1 > .shadow-md').contains('No Server Response').should('exist');
    });
  });
});