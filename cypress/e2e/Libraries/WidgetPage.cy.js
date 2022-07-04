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

        cy.createWidgetWithNewCategory(input)
    })
})