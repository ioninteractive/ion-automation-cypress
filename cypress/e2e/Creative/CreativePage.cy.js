/// <reference types="Cypress"/>

const faker = require('faker')

const quickStartCreative = {
    name: faker.datatype.uuid(),
    description: faker.random.words(10)
}
const creativeFromScratch = {
    name: faker.datatype.uuid(),
    pagename: faker.datatype.uuid(),
    description: faker.random.words(10)
}
describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new Creative using a quick start", () => {
        cy.newCreative(quickStartCreative)
        cy.get('a[class="popoutNav-link popoutNav-link-creative"]').contains(quickStartCreative.name).should('exist')
    })
    it("Tests - Edit a creative created using a quick start", () => {
        const newName = faker.datatype.uuid()
        cy.editCreative({ oldName: quickStartCreative.name, name: newName, description: faker.random.words(10) })
        quickStartCreative.name = newName
        cy.wait(3000)
        cy.get('span[class="c-breadcrumbs__item"]').contains(newName).should('exist')

    })
    it("Tests - Delete a creative created using a quick start", () => {
        cy.deleteCreative(quickStartCreative)
        cy.wait(1000)
        cy.contains(quickStartCreative.name).should('not.exist')
    })
    it("Tests - Create a new creative from scratch", () => {
        cy.startCreativeFromScratch(creativeFromScratch)
        cy.get('a[class="popoutNav-link popoutNav-link-creative').contains(creativeFromScratch.name).should('exist')
    })
    it("Tests - Delete a new creative started from scratch", () => {
        cy.deleteCreative(creativeFromScratch)
        cy.contains(creativeFromScratch.name).should('not.exist')
    })
    it("Tests - Copy a creative from the same campaign - my creatives tab", () => {
        const newCreative = {
            name: faker.datatype.uuid(),
            description: faker.random.words(10)
        }

        cy.copyCreative(newCreative)
        cy.get('a[class="popoutNav-link popoutNav-link-creative').contains(newCreative.name).should('exist')
        cy.visitCampaign()
        cy.contains(newCreative.name).should('exist')
    })
    it("Tests - Copy a creative from a different campaign", () => {
        const campaign = {
            name: faker.datatype.uuid(),
            description: faker.random.words(10)
        }
        cy.createCampaign(campaign)
        const newCreative = {
            name: faker.datatype.uuid(),
            description: faker.random.words(10)
        }
        cy.copyCreative({ ...newCreative, campaign: campaign.name })

        cy.get('a[class="popoutNav-link popoutNav-link-creative').contains(newCreative.name)
        cy.visitCampaign()
        cy.contains(newCreative.name).should('not.exist')
        cy.visitPortfolio()
        cy.contains(campaign.name).click()
        cy.contains(newCreative.name).should('exist')
    })
    it("Tests - Duplicate a creative", () => {
        const newCreative = {
            name: faker.datatype.uuid()
        }

        cy.duplicateCreative(newCreative);

        cy.get('span[class="c-breadcrumbs__item"]').contains(newCreative.name).should('exist')
        cy.contains(Cypress.env('portfolioName')).should('exist')
        cy.contains(Cypress.env('campaignName')).should('exist')
    })
    it('Tests - Quick Start Search - Show quick starts found', () => {
        const search = 'inf'
        const searched = 'Infographic'
        cy.visitCampaign()
        cy.get('a[data-region="creative-button"]').click()
        cy.wait(2000)
        cy.get('#templates_search').type(searched)
        cy.wait(2000)
        cy.get('p[title]').contains(searched).should('exist')
        //cy.get(`p[title]${searched}`).children().should('have.length.gt', 0)

        
    })    
    it('Tests - Quick Start Search - Show not found error message', () => {
        const search = 'asdasdasddwqeqwedsq'
        cy.visitCampaign()
        cy.get('a[data-region="creative-button"]').click()
        cy.wait(2000)
        cy.get('#templates_search').type(search)
        cy.wait(2000)
        //cy.get(`#qscat${search}`).should('not.exist')
        cy.contains('No creatives found for this filter.').should('exist')
        cy.contains('Please, try again using different filters.').should('exist')
    })
})






