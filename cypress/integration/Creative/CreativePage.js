/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Creative Page", () => {
    it.only("Tests - Create a new Creative using a quick start", () => {
        const creativeName = {
            nameCreative: faker.random.words(1),
            creativeDescription: faker.random.words(10)
        }

        cy.newCreative(creativeName);

        cy.contains(creativeName.nameCreative)
            .should('exist')
    })
})