/// <reference types="Cypress"/>
const faker = require('faker')

const campaign = {
    name: faker.datatype.uuid().replaceAll('-', ''),
    description: faker.random.words(10)
}
describe("Tests - Campaign Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a Campaign", () => {
        cy.createCampaign(campaign)
        cy.contains(campaign.name).should('exist')
    })
    it("Tests - delete a Campaign", () => {
        cy.deleteCampaign(campaign)
        cy.contains(campaign.name).should('not.exist')
    })
})