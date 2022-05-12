/// <reference types="Cypress"/>

const faker = require('faker')

Cypress.Commands.add('portfolioCreate', portfolioName => {

    cy.loginEmail()
    cy.visit('Admin/portfolios')

    cy.get('a[class="c-button c-button--primary"]').click()

    cy.get("#inLabel").type(portfolioName.namePortfolio)
    cy.get("#inDescription").type(portfolioName.portfolioDescription)
    cy.get("#Submit1").click()
  
})

Cypress.Commands.add('portfolioDelete', portfolioName => {


    //cy.get('a:contains(Portfolios)').click()

    //cy.get("#inLabel").type(portfolioName.namePortfolio)
    //cy.get("#inDescription").type(portfolioName.portfolioDescription)
    //cy.get("#Submit1").click()

})