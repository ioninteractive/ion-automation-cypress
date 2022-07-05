/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Creative Page", () => {
    it("Tests - Create a new Creative using a quick start", () => {
        const creativeName = {
            nameCreative: faker.random.words(1),
            creativeDescription: faker.random.words(10)
        }

        cy.newCreative(creativeName);

        cy.get('span[class="c-breadcrumbs__item"]').contains(creativeName.nameCreative)

    })
})