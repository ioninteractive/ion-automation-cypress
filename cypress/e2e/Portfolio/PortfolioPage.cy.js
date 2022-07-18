/// <reference types="Cypress"/>

const faker = require('faker')
const portfolio = {
    name: faker.datatype.uuid().replaceAll('-', ''),
    description: faker.random.words(10)
}
const newPortfolio = {
    oldName: portfolio.name,
    name: faker.datatype.uuid().replaceAll('-', ''),
    description: faker.random.words(10)
}

describe("Tests - Portfolio Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new Portfolio", () => {
        cy.createPortfolio(portfolio)
        cy.visitPortfolios()
        cy.contains(portfolio.name).should('exist')
    })

    it("Tests - Edit Portfolio", () => {
        cy.editPortfolio(newPortfolio)
        cy.visitPortfolios()
        cy.contains(portfolio.name).should('not.exist')
        cy.contains(newPortfolio.name).should('exist')

    })
    it("Tests - Delete Portfolio", () => {
        cy.deletePortfolio(newPortfolio)
        cy.visitPortfolios()
        cy.contains(newPortfolio.name).should('not.exist')
    })
})
