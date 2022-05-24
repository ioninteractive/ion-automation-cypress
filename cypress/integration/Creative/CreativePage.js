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
    it("Tests - Edit the creative created before", () => {
        const editCreative = {
            creativeEdit: faker.random.words(2),
            creativeDescription: faker.random.words(10)
        }

        cy.editCreative(editCreative);

        cy.contains(editCreative.creativeEdit)
            .should('exist')
    })
})

describe("Tests - Creative Page", () => {
    it("Tests - Copy a page of creative", () => {
        const copyCreative = {
            creativeCopy: faker.random.words(2),
            creativeCopyDescription: faker.random.words(10)
        }

        cy.copyCreative(copyCreative);

        cy.contains(copyCreative.creativeCopy)
            .should('exist')
    })
})

describe("Tests - Creative Page", () => {
    it("Tests - Create a new creative from scratch", () => {
        const startCreativeFromScratch = {
            creativeFromScratch: faker.random.words(2),
            creativeFromScratchDescription: faker.random.words(10)
        }

        cy.startCreativeFromScratch(startCreativeFromScratch);

        cy.contains(startCreativeFromScratch.creativeFromScratchDescription)
            .should('exist')
    })
})