/// <reference types="Cypress"/>
require('cypress-xpath')

Cypress.Commands.add('visitPortfolio', () => {
    cy.visit(`/Admin/Portfolios/${Cypress.env('portfolioId')}`)
})

Cypress.Commands.add('visitPortfolios', () => {
    cy.visit('Admin/Portfolios')
})

Cypress.Commands.add('createPortfolio', portfolio => {
    const { name, description } = portfolio

    cy.visitPortfolios()

    cy.get('a[class="c-button c-button--primary"]').click()

    cy.get("#inLabel").type(name)
    cy.get("#inDescription").type(description)
    cy.get("#Submit1").click()
})

Cypress.Commands.add('editPortfolio', portfolio => {
    const { name, description, oldName } = portfolio

    cy.visitPortfolios()

    cy.contains(oldName).click()
    cy.get('a[class="c-button"]')
        .contains('Edit portfolio')
        .click()
    cy.get("#inLabel").clear()
        .type(name)
    cy.get("#inDescription").clear()
        .type(description)
    cy.get("#Submit1").click()
})


Cypress.Commands.add('deletePortfolio', portfolio => {
    const { name } = portfolio

    cy.visitPortfolios()
    const clickOnDeleteButton = () => cy.contains(name).parent().siblings().last().children().first().click()
    clickOnDeleteButton()
    cy.get('#formDeleteSubmit').click()

})