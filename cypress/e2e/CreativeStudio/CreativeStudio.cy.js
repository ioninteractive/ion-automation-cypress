/// <reference types="Cypress"/>
require('cypress-xpath')
import 'cypress-iframe'
const faker = require('faker')
const imagePath = './cypress/files/gif-image.gif'
const fulfillmentPath = './cypress/files/fulfillment-pdf-file.pdf'
const fulfillmentFileContent = 'this is a fulfillment test'
const getFileName = path => path.split('/').pop()
const imageName = getFileName(imagePath)
const imageCategory = faker.datatype.uuid().replaceAll('-', '')
const creativeName = faker.datatype.uuid()
describe("Tests - Creative Studio - Form", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Add form to creative", () => {
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
})

describe("Tests - Creative Studio - Actions", () => {
    before(() => {
        cy.loginEmail()
        cy.uploadImage({
            filePath: imagePath,
            fileName: imageName,
            category: imageCategory,
            annotation: faker.random.words(10)
        })
        cy.createEngagedCreative({ creativeName })
        const getCreativeIdFromUrl = url => url.split('/').pop()
        cy.get('#buttonCreativePreview').invoke('attr', 'href').then(getCreativeIdFromUrl).as('creativeId')
        cy.get('@creativeId').then(creativeId => cy.createURL({ urlCreate: faker.datatype.uuid(), creativeId }))
        cy.visitCreativeStudio({ creativeName })
        cy.addImageToCreative({ imageCategory, imageName })
        cy.logout()
    })
    beforeEach(() => {
        cy.loginEmail()
    })
    it('Add to creative a image with external URL action', () => {
        cy.visitCreativeStudio({ creativeName })
        cy.openImageEditor({ imageName })
        const externalUrl = 'https://rockcontent.com/'
        cy.addExternalUrlAction({ url: externalUrl })
        cy.assertExternalUrlAction({ creativeName, imageName, externalUrl })
    })
    it('Add to creative a image with go to another page action', () => {
        cy.visitCreativeStudio({ creativeName })
        cy.openImageEditor({ imageName })
        cy.addGoToPageAction({ pageIndex: 2 })
        cy.assertGoToPageAction({ creativeName, imageName })
    })
    it('Add to creative a image with download fulfillment action', () => {
        const fulfillmentName = getFileName(fulfillmentPath)
        const fulfillmentCategory = faker.datatype.uuid().replaceAll('-', '')
        cy.uploadFulfillment({
            filePath: fulfillmentPath,
            fileName: fulfillmentName,
            category: fulfillmentCategory,
            annotation: faker.random.words(10)
        })
        cy.visitCreativeStudio({ creativeName })
        cy.openImageEditor({ imageName })
        cy.addDownloadFulfillmentAction({ category: fulfillmentCategory, fulfillment: fulfillmentName })
        cy.assertDownloadFulfillmentAction({ creativeName, imageName, fulfillmentName, fulfillmentFileContent })
    })
    it('Add to creative a image with download page as pdf action', () => {
        const pageTextContent = 'this text should be in the page as pdf file'
        cy.visitCreativeStudio({ creativeName })
        cy.addTextToCreative({ text: pageTextContent })
        cy.openImageEditor({ imageName })
        const fileName = 'page-as-pdf.pdf'
        cy.addDownloadPageAsPdfAction({ fileName })
        cy.assertDownloadPageAsPdfAction({ creativeName, imageName, fileName, pageTextContent })
    })
})