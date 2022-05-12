/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Portfolio Page", () => {
    it("Tests - Create a new Portfolio", () => {
        const portfolioName = {
            namePortfolio: faker.random.words(1),
            portfolioDescription: faker.random.words(10)
        }

        cy.portfolioCreate(portfolioName);

        cy.contains(portfolioName.namePortfolio)
            .should('exist')
    })
})
//    it("Tests - Delete Portfolio", () => {
        

//        cy.portfolioDelete(portfolioName);

//        cy.contains(portfolioName.namePortfolio)
//            .should('exist')
//    })
//})