describe('asu customizations', () => {
    before(() => {
      cy.visit('/search?vid=01ASU', {
        onBeforeLoad(win) {
          cy.stub(win, 'open').as('windowOpen')
        }
      });
    })
    
    describe('libchat button', () => {
      it(`should render the libchat button`, () => {
            cy.get('prm-search-bookmark-filter-after').should('exist');
            cy.get('.lib-chat').should('exist');
            cy.get('new-lib-chat button').should(($button) => {
                const text = $button.text();
                expect(["Help", "Chat"]).to.include(text);
            })
            cy.get('.lib-chat').click();
            const link_options = ["https://v2.libanswers.com/chati.php?hash=02637e8fb84872365591a9301a88de79", "https://askalibrarian.asu.edu"];
            cy.get('@windowOpen').should('be.called');
      });
    });
  
  
  })
  