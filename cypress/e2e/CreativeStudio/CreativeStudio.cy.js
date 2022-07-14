/// <reference types="Cypress"/>
require('cypress-xpath')
const faker = require('faker')
const imagePath = './cypress/files/gif-image.gif'
const fulfillmentPath = './cypress/files/fulfillment-pdf-file.pdf'
const fulfillmentFileContent = 'this is a fulfillment test'
const getFileName = path => path.split('/').pop()

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
        const imageName = getFileName(imagePath)
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
            cy.assertExternalUrlAction({ creativeName, imageName, externalUrl })
        })
    })
    it('Tests - Add to creative a image with go to another page action', () => {
        const imageName = getFileName(imagePath)
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
            cy.assertGoToPageAction({ creativeName, imageName })
        })
    })
    it('Tests - Add to creative a image with download fulfillment action', () => {
        const imageName = getFileName(imagePath)
        const imageCategory = faker.datatype.uuid().replaceAll('-', '')
        cy.uploadImage({
            filePath: imagePath,
            fileName: imageName,
            category: imageCategory,
            annotation: faker.random.words(10)
        })
        const fulfillmentName = getFileName(fulfillmentPath)
        const fulfillmentCategory = faker.datatype.uuid().replaceAll('-', '')
        cy.uploadFulfillment({
            filePath: fulfillmentPath,
            fileName: fulfillmentName,
            category: fulfillmentCategory,
            annotation: faker.random.words(10)
        })
        const creativeName = faker.datatype.uuid()
        cy.createEngagedCreative({ creativeName })
        const getCreativeIdFromUrl = url => url.split('/').pop()
        cy.get('#buttonCreativePreview').invoke('attr', 'href').then(getCreativeIdFromUrl).as('creativeId')
        cy.get('@creativeId').then(creativeId => {
            cy.createURL({ urlCreate: faker.datatype.uuid(), creativeId })
            cy.addImageToCreative({ creativeName, imageCategory, imageName })
            cy.addDownloadFulfillmentAction({ category: fulfillmentCategory, fulfillment: fulfillmentName })
            cy.assertDownloadFulfillmentAction({ creativeName, imageName, fulfillmentName, fulfillmentFileContent })
        })
    })
})