/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Create URL", () => {
    it("Tests - Create a new URL", () => {
        const createURL = {
            urlCreate: faker.random.words(1),
        }

        cy.createURL(createURL);

        cy.contains(createURL.urlCreate)
            .should('exist')


    })
})

describe("Tests - Creative Page", () => {
    it("Tests - To delete a URL, only.", () => {

        /*for (let i = 0; i < 5 ; i++) {

            cy.loginEmail()
            cy.visit('Admin/Campaigns/Campaign/291')
            cy.xpath('//button[@data-for-region="urls"]').wait(500).click({ force: true })

            cy.xpath('/html/body/div[4]/div[3]/div[1]/div[3]/section[2]/div[2]/table/tbody/tr[1]/td[7]/a').wait(500).click({ force: true })
            cy.get("#formDeleteSubmit").click({ force: true })
        }*/

    })

})