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

    it("Tests - Edit Portfolio", () => {
        const portfolioEditName = {
            nameEditPortfolio: faker.random.words(1),
            portfolioEditDescription: faker.random.words(10)
        }
        cy.portfolioEdit(portfolioEditName)
        //cy.title()
        //    .should('include', 'ion ? Portfolio ? * ion AForTesting')
        //    .and
        cy.get('a[class="c-button"]').should('be.visible')

    })

})

//    it("Tests - Delete Portfolio", () => {
        

//        cy.portfolioDelete(portfolioName);

//        cy.contains(portfolioName.namePortfolio)
//            .should('exist')
//    })
//})

describe("Tests - Campaign Page", () => {
    it("Tests - Create a new Campaign", () => {
        const campaignName = {
            nameCampaign: faker.random.words(1),
            campaignDescription: faker.random.words(10)
        }

        cy.campaignCreate(campaignName)

        cy.get('th[class="c-data-grid__col"]')
            .contains('Campaign')
            .should('be.visible')
    })

    it.only("Tests - Delete a new Campaign", () => {

        cy.campaignDelete()

        cy.xpath('(//tr[@class="c-data-grid__row"])[1]')
            .should('not.exist')
    })
})