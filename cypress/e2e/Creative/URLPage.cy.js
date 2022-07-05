/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Create URL", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new URL", () => {
        const createURL = {
            urlCreate: faker.random.uuid(),
            chooseFirstCreative: true
        }

        cy.createURL(createURL);

        cy.get('span[class="c-breadcrumbs__item"]').contains(createURL.urlCreate)

    })
})

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - To delete a URL, only.", () => {

        //for (let i = 0; i < 10 ; i++) {

            cy.visitCampaign()
            cy.xpath('//button[@data-for-region="urls"]').wait(500).click({ force: true })

            cy.xpath('/html/body/div[4]/div[3]/div[1]/div[3]/section[2]/div[2]/table/tbody/tr[1]/td[7]/a').wait(500).click({ force: true })
            cy.get("#formDeleteSubmit").click({ force: true })
       // }

    })

})

describe("Tests - Edit URL", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    const inputs = [
        { urlName: faker.random.uuid(), isRedirectType301: true, seoType: 'Always', isRespondentsAlwaysNew: false, description: faker.random.words(10), defaultURL: `https://${faker.random.words(1)}.com`, sitemapPriority: '0.0', mediaTypeIndex: 1, vehicleIndex: 1, domainIndex: 5 },
        { urlName: faker.random.uuid(), isRedirectType301: false, seoType: 'Never', isRespondentsAlwaysNew: true, description: faker.random.words(10), defaultURL: `https://${faker.random.words(1)}.com`, sitemapPriority: '0.7', mediaTypeIndex: 3, vehicleIndex: 0, domainIndex: 2 },
        { urlName: faker.random.uuid(), isRedirectType301: true, seoType: 'If SEO Creative', isRespondentsAlwaysNew: true, description: faker.random.words(10), defaultURL: `https://${faker.random.words(1)}.com`, sitemapPriority: '0.9', mediaTypeIndex: 4, vehicleIndex: 0, domainIndex: 4 },
    ]

    inputs.forEach(input => {
        it("Tests - Edit the first URL from URLs page", () => {
            cy.editURL(input)
        })
    })
})

describe("Tests - Insert a creative to a URL", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    const inputs = [
        { creativeWeight: 10 },
        { creativeWeight: 5 }
    ]

    inputs.forEach(input => {
        it("Tests - Create a URL and then add a engaged creative", () => {
            const { creativeWeight } = input

            cy.createEngagedCreative({ creativeName: faker.random.uuid() })
            const getCreativeIdFromUrl = url => url.split('/').pop()
            cy.get('#buttonCreativePreview').invoke('attr', 'href').then(getCreativeIdFromUrl).as('creativeId')
    
            cy.createURL({ urlCreate: faker.random.uuid() })
            
            const addWeightToCreative = () => cy.get('@creativeId').then(creativeId => cy.get(`#weight-${creativeId}`).select(creativeWeight, { force: true }))
            addWeightToCreative()
    
            cy.get('@creativeId').then(creativeId => cy.get(`#weight-${creativeId}`).should('have.value', creativeWeight))
            cy.reload(true)
            cy.get('@creativeId').then(creativeId => cy.get(`#weight-${creativeId}`).should('have.value', creativeWeight))
        })
    })

    it("Tests - Create a URL choosing an engaged creative", () => {
        cy.createEngagedCreative({ creativeName: faker.random.uuid() })
        const getCreativeIdFromUrl = url => url.split('/').pop()
        cy.get('#buttonCreativePreview').invoke('attr', 'href').then(getCreativeIdFromUrl).as('creativeId')

        cy.get('@creativeId').then(creativeId => cy.createURL({ urlCreate: faker.random.uuid(), creativeId }))

        const defaultWeight = 5
        cy.get('@creativeId').then(creativeId => cy.get(`#weight-${creativeId}`).should('have.value', defaultWeight))
        cy.reload(true)
        cy.get('@creativeId').then(creativeId => cy.get(`#weight-${creativeId}`).should('have.value', defaultWeight))
    })
})
