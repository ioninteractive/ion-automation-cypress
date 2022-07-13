/// <reference types="Cypress"/>
require('cypress-xpath')
const faker = require('faker')
const imagePath = './cypress/files/gif-image.gif'
describe("Tests - Creative Studio", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Add form to creative", () => {
        const createFormData = { 
            category: faker.datatype.uuid(),
            label: faker.datatype.uuid(),
            description: faker.random.words(10)
        }
        const formFields = [
            { dataFieldCategory: 'Contact info', dataField: 'First name' },
            { dataFieldCategory: 'Contact info', dataField: 'Email address' },
            { dataFieldCategory: 'Contact info (address)', dataField: 'City' },
        ]
        const creativeData = {
            name: faker.datatype.uuid(),
            description: faker.random.words(10)
        }
        cy.addLibraryFormToCreative({ createFormData, formFields, creativeData })               
    })
    it('Tests - Add to creative a image with external URL action', () => {
        const imageName = imagePath.split('/').pop()
        const imageCategory = faker.datatype.uuid().replaceAll('-', '')
        cy.uploadImage({
            filePath: imagePath,
            fileName: imageName,
            category: imageCategory,
            annotation: faker.random.words(10)
        })
        const creativeName = faker.datatype.uuid()
        cy.createEngagedCreative({ creativeName })
        const getCreativeIdFromUrl = url => url.split('/').pop()
        cy.get('#buttonCreativePreview').invoke('attr', 'href').then(getCreativeIdFromUrl).as('creativeId')
        cy.get('@creativeId').then(creativeId => {
            cy.createURL({ urlCreate: faker.datatype.uuid(), creativeId })
            cy.addImageToCreative({ creativeName, imageCategory, imageName })
            const externalUrl = 'https://rockcontent.com/'
            cy.addExternalUrlAction({ url: externalUrl})
            cy.visitCampaign()
            cy.contains(creativeName).click()
            const livePageUrlXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[4]/div[2]/ul/li[1]/div[2]/span'
            cy.xpath(livePageUrlXPath).then($el => cy.visit($el.text()))
            cy.get(`img[src*="${imageName}"]`).should('be.visible').and($img => expect($img[0].naturalWidth).to.be.greaterThan(0)).click()
            cy.url().should('eq', externalUrl)
        })
    })
    it('Tests - Add to creative a image with go to another page action', () => {
        const imageName = imagePath.split('/').pop()
        const imageCategory = faker.datatype.uuid().replaceAll('-', '')
        cy.uploadImage({
            filePath: imagePath,
            fileName: imageName,
            category: imageCategory,
            annotation: faker.random.words(10)
        })
        const creativeName = faker.datatype.uuid()
        cy.createEngagedCreative({ creativeName })
        const getCreativeIdFromUrl = url => url.split('/').pop()
        cy.get('#buttonCreativePreview').invoke('attr', 'href').then(getCreativeIdFromUrl).as('creativeId')
        cy.get('@creativeId').then(creativeId => {
            cy.createURL({ urlCreate: faker.datatype.uuid(), creativeId })
            cy.addImageToCreative({ creativeName, imageCategory, imageName })
            cy.addGoToPageAction({ pageIndex: 2 })
            cy.visitCampaign()
            cy.contains(creativeName).click()
            const livePageUrlXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[4]/div[2]/ul/li[1]/div[2]/span'
            cy.xpath(livePageUrlXPath).then($el => cy.visit($el.text()))
            cy.url().as('landingPageUrl')
            cy.get(`img[src*="${imageName}"]`).should('be.visible').and($img => expect($img[0].naturalWidth).to.be.greaterThan(0)).click()
            const matchLandingPageSlashAnything = landingPageUrl => new RegExp(`^${landingPageUrl}\/.+$`)
            cy.get('@landingPageUrl').then(landingPageUrl => cy.url().should('match', matchLandingPageSlashAnything(landingPageUrl)))
        })
    })
})