const faker = require('faker')
const fulfillments = [
    './cypress/files/fulfillment-pdf-file.pdf'
]

describe("Tests - Fulfillment page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    //Update this test using the other eleven types of file extension
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
            it(`Tests - Delete a ${fulfillment.split('.').pop()} fulfillment in the library `, () => {
                cy.deletingAFile({
                    filePath: fulfillment,
                    fileName: fulfillment.split('/').pop(),
                    category: faker.datatype.uuid().replaceAll('-', ''),
                    annotation: faker.random.words(10)
                })
            })


        it('Tests - Try to insert a fulfillment without a file', () => {
            cy.tryToUploadWithoutAFile({
                category: faker.datatype.uuid().replaceAll('-', ''),
                annotation: faker.random.words(10)
            })
         })

        it('Tests - Move a file to another category', () => {
            cy.moveAFileToAnotherCategory()

        }) 
        /* New scenarios
        
        Update a file in an existing category

        Click to view the file

        Validate the “Used in” button 
        
        
        */ 


      })
   })
})