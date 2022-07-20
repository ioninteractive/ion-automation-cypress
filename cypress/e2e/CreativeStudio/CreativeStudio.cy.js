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
        cy.createURL({ name: faker.datatype.uuid(), creativeName })
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

const microTheme = {
    category: 'Images',
    value: 'Center Align',
    classes: ['image-c']
}
describe("Tests - Creative Studio - Micro-Themes", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Add micro-theme to creative", () => {
        cy.visitCreativeStudio({ creativeName })
        cy.openImageEditor({ imageName })
        cy.addMicroTheme(microTheme)
        microTheme.classes.forEach(cl => cy.iframe('#page_iframe').find(`img[src*="${imageName}"]`).should('have.class', cl))
        cy.visitLivePage({ creativeName })
        microTheme.classes.forEach(cl => cy.get(`img[src*="${imageName}"]`).should('have.class', cl))
    })
})

describe("Tests - Creative Studio - Optimized Images", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Check source of optimized image", () => {
        cy.visitLivePage({ creativeName })
        cy.url().as('livePageUrl')
        cy.get(`img[src*="${imageName}"]`).then($img => {
            assert.isTrue($img.attr('src').startsWith('https://iuploads.scribblecdn.net/'), 'original images should be hosted by iuploads.scribblecdn.net')
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        })
        cy.get(`img[src*="${imageName}"]`).then($img => $img.attr('id')).as('imgId')
        
        cy.setAlwaysOptimizeImage({ creativeName, imageName })
        cy.get('@livePageUrl').then(livePageUrl => cy.visit(livePageUrl))
        cy.get('@imgId').then(imgId => cy.get(`#${imgId}`).then($img => {
            assert.isTrue($img.attr('src').startsWith('https://ion-imagesizer.scribblecdn.net/'), 'optimized images should be hosted by ion-imagesizer.scribblecdn.net')
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        }))
        
        cy.setInheritOptimizeImageBehaviorFromLibrary({ creativeName, imageName })
        cy.get('@livePageUrl').then(livePageUrl => cy.visit(livePageUrl))
        cy.get('@imgId').then(imgId => cy.get(`#${imgId}`).then($img => {
            assert.isTrue($img.attr('src').startsWith('https://iuploads.scribblecdn.net/'), 'original images should be hosted by iuploads.scribblecdn.net')
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        }))
        
        cy.optimizeImage({ category: imageCategory, name: imageName })
        cy.get('@livePageUrl').then(livePageUrl => cy.visit(livePageUrl))
        cy.get('@imgId').then(imgId => cy.get(`#${imgId}`).then($img => {
            assert.isTrue($img.attr('src').startsWith('https://ion-imagesizer.scribblecdn.net/'), 'optimized images should be hosted by ion-imagesizer.scribblecdn.net')
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        }))
    })
})
