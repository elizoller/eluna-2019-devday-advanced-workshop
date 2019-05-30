describe('asu customizations', () => {
    before(() => {
        cy.visit('/search?vid=01ASU', {
            onBeforeLoad(win) {
                cy.stub(win, 'open').as('windowOpen')
            }
        });
    })

    describe('custom no results page', () => {
        it(`should render the content of the custom no results page`, () => {
            cy.get('#searchBar')
                .type('983jks09df9sl{enter}')
            cy.url().should('include', '983jks09df9sl')
            cy.get('prm-no-search-result').should('exist');
            cy.get('prm-no-search-result').should('contain', 'No records found');
            cy.get('prm-no-search-result').should('contain', 'Adjust your keywords');
            cy.get('prm-no-search-result').should('contain', 'Try something else');
            cy.get('prm-no-search-result').should('contain', 'Search other resources');
            cy.get('prm-no-search-result').should('contain', 'Still not working?');
        });
    });


})
