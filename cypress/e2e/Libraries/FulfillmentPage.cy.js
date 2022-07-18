const faker = require('faker')
const fulfillments = [
    './cypress/files/fulfillment-pdf-file.pdf'
]

describe("Tests - Fulfillment page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    fulfillments.forEach(fulfillment => {
        it(`Tests - Insert a ${fulfillment.split('.').pop()} fulfillment in the library `, () => {
            cy.uploadFulfillment({
                filePath: fulfillment,
                fileName: fulfillment.split('/').pop(),
                category: faker.datatype.uuid().replaceAll('-', ''),
                annotation: faker.random.words(10)
            })
        })
    })
})