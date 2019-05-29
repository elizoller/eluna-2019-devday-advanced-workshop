describe('asu customizations', () => {
    before(() => {
      cy.visit('/search?vid=01ASU', {
        onBeforeLoad(win) {
          cy.stub(win, 'open').as('windowOpen')
        }
      });
    })
  

    describe('sms call number/twilio integration', () => {
      before(() => {
        cy.get('#searchBar')
          .type('frogs{enter}')
        cy.url().should('include', 'frogs')
      });
  
      it('should have a twilio button in the brief results', () => {
        cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
          .first()
          .then($el => {
            expect($el.text().length).to.be.at.least(1)
            cy.get(`#facets`).click({ force: true })
            cy.get(`#briefResultMoreOptionsButton`)
              .click();
            cy.get(`prm-action-list .button-text`).should('contain', 'Text Me');
          });
  
      });
  
      it('should have a twilio button in the full results', () => {
        cy.get(`[id ^= 'SEARCH_RESULT_RECORDID_']:first .item-title`)
          .click();
        cy.get(`prm-full-view prm-action-list .button-text`).should('contain', 'Text Me');
      });
  
      it('should open the form when clicked', () => {
        cy.get(`prm-full-view prm-action-list li[name="send_sms"]`).click();
        cy.get(`twilio-send-sms`).should('exist');
        cy.get(`twilio-send-sms input[name="phoneNumber"]`).should('exist');
      });
  
      // can't actually test that it sends because captcha is enabled HAH
      after(() => {
        cy.get(`.md-dialog-container > .layout-row > button[aria-label="Close Full Display"]`).click();
      });
    });
  
  })
  