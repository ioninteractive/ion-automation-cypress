const faker = require('faker')

const newLabel = {
    label: faker.random.words(1),
    labelExceed: faker.random.words(15)
}


describe("Tests - Components Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new component label", () => {
        cy.createNewLabel(newLabel)    
    })
    it("Tests - Delete a component label", () => {
        cy.deleteALabel(newLabel)
    })
    it("Tests - Select components grouped by labels", () => {

    })
    it("Tests - Delete components", () => {

    })
    it("Tests - Access the components ( by pages)", () => {

    })
    it("Tests - Edit Components' names, labels, and description", () => {

    })
    it("Tests - Validate not creating label names that exceed 80 char", () => {
        cy.validateNotcreatinglabelNamesExceed80char(newLabel)
    })
})

   
