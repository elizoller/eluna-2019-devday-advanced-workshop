describe('asu customizations', () => {
    before(() => {
      cy.visit('/search?vid=01ASU', {
        onBeforeLoad(win) {
          cy.stub(win, 'open').as('windowOpen')
        }
      });
    })
    
    describe('clickable logo', () => {
      it(`should render the logo and be clickable`, () => {
            cy.get('prm-logo-after').should('exist');
            cy.get('prm-logo-after .logo-image').should('exist');
            cy.get("prm-logo-after #banner a").should('have.attr', 'href').and('equal', 'https://lib.asu.edu/');
            // don't need to actually click
      });
    });
  
  
  })
  