/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new Creative using a quick start", () => {
        const creativeName = {
            nameCreative: faker.random.words(1),
            creativeDescription: faker.random.words(10)
        }

        cy.newCreative(creativeName);

        cy.get('span[class="c-breadcrumbs__item"]').contains(creativeName.nameCreative)

    })
})

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Edit the creative created before", () => {
        const editCreative = {
            label: faker.random.words(2),
            description: faker.random.words(10)
        }

        cy.editCreative(editCreative);

        cy.get('span[class="c-breadcrumbs__item"]').contains(editCreative.label)

    })
})

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Copy a page of creative", () => {
        const copyCreative = {
            creativeCopy: faker.random.words(2),
            creativeCopyDescription: faker.random.words(10)
        }

        cy.copyCreative(copyCreative);

        cy.get('span[class="c-breadcrumbs__item"]').contains(copyCreative.creativeCopy)

    })
})

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new creative from scratch", () => {
        const startCreativeFromScratch = {
            creativeFromScratch: faker.random.words(2),
            creativeFromScratchDescription: faker.random.words(10)
        }

        cy.startCreativeFromScratch(startCreativeFromScratch);

        cy.get('span[class="c-breadcrumbs__item"]').contains(startCreativeFromScratch.creativeFromScratch)

    })
})

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Deleting a creative created using a quick start", () => {
        const deletingNewCreative = {
            name: faker.random.words(1),
            description: faker.random.words(10)
        }

        cy.deleteNewCreative(deletingNewCreative);


        cy.wait(1000)
        cy.contains(deletingNewCreative.name)
            .should('not.exist')

    })
})

/**
 * This was created only to delete a creative!
 * Creative with preview and without preview
 *  
 */

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    for (let i = 0; i < 30; i++) {
        // it("Tests - To delete a creative, only.", () => {


        //         cy.loginEmail()
        //         cy.visitCampaign()

        //         cy.xpath('(//span[@class="o-icon o-icon--delete"])[1]').click()
        //         cy.get("#formDeleteSubmit").click({ force: true })


        // })
    }
})

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Edit the creative after deleting it.", () => {
        const editCreativeAndDelete = {
            label: faker.random.words(2),
            description: faker.random.words(10)
        }

        cy.editCreativeAndDelete(editCreativeAndDelete);
        cy.contains(editCreativeAndDelete.label).should('not.exist')

    })
})

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Delete a new creative started from scratch", () => {
        const deleteCreativeStartFromScratch = {
            creativeFromScratch: 'Creative Start From Scratch',
            creativeFromScratchDescription: faker.random.words(10)
        }

        cy.deleteCreativeStartFromScratch(deleteCreativeStartFromScratch);

        cy.contains('Creative Start From Scratch')
            .should('not.exist')
    })
})

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Duplicate a creative", () => {
        const duplicateCreative = {
            creativeName: faker.random.words(1)
        }

        cy.duplicateCreative(duplicateCreative);

        cy.get('span[class="c-breadcrumbs__item"]').contains(duplicateCreative.creativeName)
        cy.contains(Cypress.env('portfolioName'))
        cy.contains(Cypress.env('campaignName'))
    })
})






