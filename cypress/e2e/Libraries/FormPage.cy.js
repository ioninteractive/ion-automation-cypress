const faker = require('faker')

describe("Tests - Form Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a form category", () => {
        cy.createFormCategory({ category: faker.datatype.uuid(), description: faker.random.words(10) })
    })
    it("Tests - Create and edit a form category", () => {
        const createCategoryData = { category: faker.datatype.uuid(), description: faker.random.words(10) }
        cy.createFormCategory(createCategoryData)
        cy.editFormCategory({ oldCategory: createCategoryData.category, category: faker.datatype.uuid(), description: faker.random.words(10) })
    })
    it("Tests - Create a form", () => {
        cy.createForm({ label: faker.datatype.uuid(), description: faker.random.words(10) })
    })
})