const faker = require('faker')

describe("Tests - Widget Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new widget with new category", () => {
        const input = {
            name: faker.datatype.uuid(),
            category: faker.random.words(1),
            code: 'some-code',
            variables: ['variable1', 'variable2']
        }

        cy.createWidget(input)
    })
    it("Tests - Create a new widget selecting first category", () => {
        const input = {
            name: faker.datatype.uuid(),
            category: null,
            code: 'some-code',
            variables: ['variable1', 'variable2']
        }

        cy.createWidget(input)
    })
    it("Tests - Create and delete a widget", () => {
        const name = faker.datatype.uuid()
        const category = faker.datatype.uuid()
        const input = {
            name,
            category,
            code: 'some-code',
            variables: ['variable1', 'variable2']
        }

        cy.createWidget(input)
        cy.deleteWidget({ name, category })
    })
    it("Tests - Delete an unused category", () => {
        const name = faker.datatype.uuid()
        const category = faker.datatype.uuid()
        const input = {
            name,
            category,
            code: 'some-code',
            variables: ['variable1', 'variable2']
        }

        cy.createWidget(input)
        cy.deleteWidget({ name, category })
        cy.deleteCategory({ category })
    })
})