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
      cy.get('#facets').should('exist');
      cy.get('.available-facets').should('have.length', 13)
      cy.get('h3.section-title-header').contains('External Search').should('exist');
      cy.get('div[data-facet-group="External Search"] .md-chips .md-chip').should('have.length', 2);
    })

    it(`should have a worldcat link with the search term in it`, () => {
      cy.get('div[data-facet-group="External Search"] .md-chips .md-chip a').first().should('have.attr', 'href').and('equal', 'https://www.worldcat.org/search?qt=owc_search&q=kw:(science)');
    })

    it(`should have a google scholar link with the search term in it`, () => {
      cy.get('div[data-facet-group="External Search"] .md-chips .md-chip a').eq(1).should('have.attr', 'href').and('equal', 'https://scholar.google.com/scholar?q=science');
    })
  });

})
