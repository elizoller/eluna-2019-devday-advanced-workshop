describe('searchbar', () => {
  before(() => {
    cy.visit('/search?vid=01ASU', {
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('windowOpen')
      }
    });
  })

  describe('scopes and search bar modifications', () => {
    // it('exists', () => {
    //   cy.get('search-bar-sub-menu').should('exist')
    // })

    // it('is visible', () => {
    //   cy.get('.search-bar-sub-menu').should('be.visible');
    // })

    describe('scopes as radio buttons', () => {
      // const submenuItems = [
      //   {
      //     label: "Provide Feedback",
      //     link: "https://nyu.qualtrics.com/jfe/form/SV_blQ3OFOew9vl6Pb?Source=NYU",
      //   },
      //   {
      //     label: "Library Hours",
      //     link: "https://guides.nyu.edu/library-hours",
      //   }
      // ]

      it(`four scope radio buttons`, () => {
        cy.get('#searchProfileRadios md-radio-button').should('have.length', 4)
      })

      // submenuItems.forEach(({ label, link }, idx) => {
      //   it(`has a button with ${label} which opens ${link} when clicked`, () => {
      //     cy.window().then(win => {
      //       const spy = cy.stub(win, 'open')

      //       cy.get('.search-bar-sub-menu-item').contains(label).click().then($el => {
      //         expect(spy).to.be.calledWith(link);
      //       })
      //       // OR BELOW, idx is like the id
      //       cy.get('search-bar-sub-menu button')
      //         .eq(idx)
      //         .should('contain', label)
      //         .click('center')
      //         .then(() => {
      //           expect(spy).to.be.calledWith(link)
      //         })
      //     })
      //   })
      // })
    })
  })
})
