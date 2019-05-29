describe('asu customizations', () => {
    before(() => {
      cy.visit('/search?vid=01ASU', {
        onBeforeLoad(win) {
          cy.stub(win, 'open').as('windowOpen')
        }
      });
    })
  
    describe('external search facet', () => {
      it(`should have external search facet section`, () => {
        cy.get('#searchBar')
          .type('science{enter}')
        cy.url().should('include', 'science')
        cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
          .first()
          .then($el => {
            expect($el.text().length).to.be.at.least(1)
          });
        cy.get('#facets').should('exist').click();
        cy.get('.expand-my-results-button-tip').should('exist');
        cy.get('.expand-my-results-button-tip').click();
        cy.get('body').should('contain', 'Expanding results will also retrieve electronic and physical items not owned by the library. This helps locate items only available through Interlibrary Loan.');
      })
    });
  
  })
  