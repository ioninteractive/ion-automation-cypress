/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Create URL", () => {
    it.only("Tests - Create a new URL", () => {
        const createURL = {
            urlCreate: faker.random.words(1),
        }

        cy.createURL(createURL);

        cy.contains(createURL.urlCreate)
            .should('exist')


    })
})