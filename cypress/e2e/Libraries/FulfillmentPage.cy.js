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

        fulfillments.forEach(fulfillment => {
            it(`Tests - Deleting a ${fulfillment.split('.').pop()} fulfillment in the library `, () => {
                cy.deletingAFile({
                    filePath: fulfillment,
                    fileName: fulfillment.split('/').pop(),
                    category: faker.datatype.uuid().replaceAll('-', ''),
                    annotation: faker.random.words(10)
                })
            })


        it('Tests - Tries to insert a fulfillment without file', () => {
            cy.tryToUploadWithoutAFile({
                category: faker.datatype.uuid().replaceAll('-', ''),
                annotation: faker.random.words(10)
            })
         })

        it('Tests - Moving a file to another category', () => {
            cy.moveAFileToAnotherCategory()

        }) 
      })
   })
})