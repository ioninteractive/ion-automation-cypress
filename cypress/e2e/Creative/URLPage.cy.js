/// <reference types="Cypress"/>

const faker = require('faker')
const url = {
    name: faker.datatype.uuid()
}
const editUrlNames = [url.name, faker.datatype.uuid(), url.name]
const editUrlInputs = [
    { oldUrlName: editUrlNames[0], urlName: editUrlNames[1], isRedirectType301: true, seoType: 'Always', isRespondentsAlwaysNew: false, description: faker.random.words(10), defaultURL: `https://${faker.random.words(1)}.com`, sitemapPriority: '0.0', mediaTypeIndex: 1, vehicleIndex: 1, domainIndex: 5 },
    { oldUrlName: editUrlNames[1], urlName: editUrlNames[2], isRedirectType301: false, seoType: 'Never', isRespondentsAlwaysNew: true, description: faker.random.words(10), defaultURL: `https://${faker.random.words(1)}.com`, sitemapPriority: '0.7', mediaTypeIndex: 3, vehicleIndex: 0, domainIndex: 2 }
]
describe("Tests - URL", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new URL", () => {
        cy.createURL(url)
        cy.get('span[class="c-breadcrumbs__item"]').contains(url.name)
        cy.visitCampaign()
        cy.get('button[data-for-region="urls"]').click()
        cy.contains(url.name).should('exist')
    })
    editUrlInputs.forEach(input => 
        it("Tests - Edit URL", () => cy.editURL(input)))

    it("Tests - Delete URL", () => {
        cy.deleteUrl({ name: url.name })

        cy.visitCampaign()
        cy.get('button[data-for-region="urls"]').click()
        cy.contains(url.name).should('not.exist')
    })
})

const creativeName = faker.datatype.uuid()
const urlName = faker.datatype.uuid()
describe("Tests - URL with creative", () => {
    before(() => {
        cy.loginEmail()
        cy.createEngagedCreative({ creativeName }) //<------------------- Change this because cookies banner is in the way
        cy.logout()
    })
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a URL and then add an engaged creative", () => {
        cy.createURL({ name: urlName })

        const creativeWeight = 7
        const addWeightToCreative = () => cy.contains(creativeName).parent().siblings().eq(1).children().first().select(creativeWeight, { force: true })
        addWeightToCreative()

        cy.contains(creativeName).parent().siblings().eq(1).children().first().should('have.value', creativeWeight)
        cy.reload(true)
        cy.contains(creativeName).parent().siblings().eq(1).children().first().should('have.value', creativeWeight)
    })
    it("Tests - Create a URL choosing an engaged creative", () => {
        cy.createURL({ name: urlName, creativeName })

        const defaultWeight = 5
        cy.contains(creativeName).parent().siblings().eq(1).children().first().should('have.value', defaultWeight)
        cy.reload(true)
        cy.contains(creativeName).parent().siblings().eq(1).children().first().should('have.value', defaultWeight)
    })
    afterEach(() => {
        cy.deleteUrl({ name: urlName })
    })
    after(() => {        
        cy.deleteCreative({ name: creativeName })
    })
})
