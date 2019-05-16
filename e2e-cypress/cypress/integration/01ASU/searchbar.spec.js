describe('asu customizations', () => {
  before(() => {
    cy.visit('/search?vid=01ASU', {
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('windowOpen')
      }
    });
  })

  const index_options = [
    { ind: 'title', urlt: 'title,contains' },
    { ind: 'author', urlt: 'creator,contains' },
    { ind: 'keyword', urlt: 'any,contains' }
  ]

  const scope_options = [
    { svalue: 'ebsco', urlp: 'tab=ebsco&search_scope=EBSCO'},
    { svalue: 'course_reserves', urlp: 'tab=course_reserves&search_scope=Course_Reserves'},
    { svalue: 'books', urlp: 'tab=books&search_scope=default_scope'},
    { svalue: 'default_tab', urlp: 'tab=default_tab&search_scope=Everything' }
  ]

  describe('scopes as radio buttons', () => {
    it(`should have four scope radio buttons`, () => {
      cy.get('#searchProfileRadios md-radio-button').should('have.length', 4)
    })

    it(`should actually change the scope when you click a radio button`, () => {
      cy.get('#searchBar')
        .type('science{enter}')
      scope_options.forEach(({ svalue, urlp }, idx) => {
        cy.get('md-radio-button[value="' + svalue + '"]').click().then($el => {
          cy.url().should('include', urlp)
        })
      });
    })
  });

  describe('dropdown for search index', () => {
    it(`should have the md-select`, () => {
      cy.get('button[aria-label="Clear search text"]').click()
      cy.get('#indexSelect').should('exist');
    });

    it(`should have the three options`, () => {
      cy.get('#indexSelect').click().then($el => {
        cy.get('._md-select-menu-container._md-clickable._md-active md-option').should('have.length', 3);

        index_options.forEach(({ind, urlt}, idx) => {
          cy.get('._md-select-menu-container._md-clickable._md-active md-option').contains(ind).should('exist');
        })
      })
    });

    it(`should have the correct option preselected when visiting the search url`, () => {
      index_options.forEach(({ ind, urlt }, idx) => {
        cy.visit("/search?vid=01ASU&query="+urlt+",potter");
        cy.get("#indexSelect md-select-value").contains(ind).should('exist');
      });
    });

    // can't test that clicking the dropdown actually changes the search because the window.postMessage functionality that makes this work is not working within cypress
  });


  describe('external search facet', () => {
    it(`should have external search facet section`, () => {
      cy.get('button[aria-label="Clear search text"]').click()
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
