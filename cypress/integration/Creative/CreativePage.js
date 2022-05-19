/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Creative Page", () => {
    it("Tests - Create a new Creative using a quick start", () => {
        const creativeName = {
            nameCreative: faker.random.words(1),
            creativeDescription: faker.random.words(10)
        }

        cy.newCreative(creativeName);

        cy.contains(creativeName.nameCreative)
            .should('exist')
    })
})

describe("Tests - Creative Page", () => {
    it.only("Tests - Edit the creative created before", () => {
        const editCreative = {
            creativeEdit: faker.random.words(2),
            creativeDescription: faker.random.words(10)
        }

        cy.editCreative(editCreative);

        cy.contains(editCreative.creativeEdit)
            .should('exist')
    })
})