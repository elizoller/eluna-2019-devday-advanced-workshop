describe('asu customizations', () => {
  before(() => {
    cy.visit('/search?vid=01ASU', {
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('windowOpen')
      }
    });
  })


  describe('scopes as radio buttons', () => {
    it(`should have four scope radio buttons`, () => {
      cy.get('#searchProfileRadios md-radio-button').should('have.length', 4)
    })
  });

  describe('dropdown for search index', () => {
    it(`should have the md-select`, () => {
      cy.get('#indexSelect').should('exist');
    });

    it(`should have the three options`, () => {
      cy.get('#indexSelect').click().then($el => {
        cy.get('#select_container_60 md-option').should('have.length', 3);
        const index_options = ['keyword', 'title', 'author']
        index_options.forEach((ind, idx) => {
          cy.get('#select_container_60 md-option').contains(ind).should('exist');
          if (idx == 2){
            cy.get('#select_container_60 md-option').contains(ind).click();
          }
        })
      })
    });
  });


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
      cy.get('.available-facets').should('have.length', 14)
      cy.get('h3.section-title-header').contains('External Search').should('exist');
    })
  });



})
