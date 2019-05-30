describe('asu customizations', () => {
    before(() => {
      cy.visit('/search?query=any,contains,frogs&tab=default_tab&search_scope=Everything&vid=01ASU&facet=tlevel,include,available&facet=rtype,include,books&lang=en_US&offset=0', {
        onBeforeLoad(win) {
          cy.stub(win, 'open').as('windowOpen')
        }
      });
    })
  

    describe('frbr search customizations', () => {
  
      it('should have a twilio button in the brief results', () => {
        cy.get(`#SEARCH_RESULT_RECORDID_01ASU_ALMA21893368170003841`).should('exist');
        cy.get(`#SEARCH_RESULT_RECORDID_01ASU_ALMA21893368170003841 > .result-item-text > prm-search-result-frbr-line > .neutralized-button`).click().then(() =>{
            cy.get("#frbr_facet_restore").should('exist');
            cy.get('#frbr_facet_restore').should('contain', 'Available in the Library');
            cy.get('#frbr_facet_restore').should('contain', 'Books');
        });
      });

    });
  
  })
  