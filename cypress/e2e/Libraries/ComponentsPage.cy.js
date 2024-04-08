const faker = require('faker')

const newLabel = {
    label: faker.random.words(1),
}


describe("Tests - Components Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new component label", () => {

        cy.createNewLabel(newLabel)    
    })
})

   
