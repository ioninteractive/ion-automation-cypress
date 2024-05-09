/// <reference types="Cypress"/>
require('cypress-xpath')


Cypress.Commands.add("viewAllPortfoliosShortcut", () => {
    cy.get('a[class="c-button c-button--text-link"]').click()
    cy.contains('Portfolios').should('exist')
    cy.contains('New portfolio').should('exist')
})

Cypress.Commands.add("viewPerformanceDashboardShortcut", () => {
    cy.get('a[class="c-button c-button--text-link h-align-self-start"]').click()
    cy.contains('Performance Dashboard').should('exist')
    cy.contains('Console Performance').should('exist')
   
})

Cypress.Commands.add("newCreativeShortcut", () => {
    cy.get('#addCreativeBtn').click()
    cy.contains('Add a new creative').should('exist')
    cy.contains('Start by choosing a portfolio and campaign for your new creative.').should('exist')
    cy.contains('(Choose a portfolio)').should('exist')
    cy.get('#portfolios').select('(Choose a portfolio)')
    cy.get('button[class="c-button popup-modal-dismiss"]').click
    cy.contains('Add a new creative').should('exist')
    cy.get('.l-section > p').should('exist')
   
})

Cypress.Commands.add("searchDropDown", input => {
      const {searchDropDown} = input

      cy.get

})