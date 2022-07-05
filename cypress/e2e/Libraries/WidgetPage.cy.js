const faker = require('faker')

describe("Tests - Widget Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new widget with new category", () => {
        const input = {
            name: faker.random.uuid(),
            category: faker.random.words(1),
            code: 'some-code',
            variables: ['variable1', 'variable2']
        }

        cy.createWidget(input)
    })
    it("Tests - Create a new widget selecting first category", () => {
        const input = {
            name: faker.random.uuid(),
            category: null,
            code: 'some-code',
            variables: ['variable1', 'variable2']
        }

        cy.createWidget(input)
    })
    it("Tests - Create and delete a widget", () => {
        const name = faker.random.uuid()
        const category = faker.random.uuid()
        const input = {
            name,
            category,
            code: 'some-code',
            variables: ['variable1', 'variable2']
        }

        cy.createWidget(input)
        cy.deleteWidget({ name, category })
    })
})