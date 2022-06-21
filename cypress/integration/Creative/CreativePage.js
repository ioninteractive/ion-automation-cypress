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

describe("Tests - Creative Page", () => {
    it("Tests - Deleting a creative created using a quick start", () => {
        const deletingNewCreative = {
            newCreativeDeletedName: faker.random.words(1),
            creativeDeletedDescription: faker.random.words(10)
        }

        cy.deleteNewCreative(deletingNewCreative);


        cy.wait(1000)
        cy.contains(deletingNewCreative.newCreativeDeletedName)
            .should('not.exist')


    })
})

/**
 * This was created only to delete a creative!
 * Creative with preview and without preview
 *  
 */

describe("Tests - Creative Page", () => {
    it("Tests - To delete a creative, only.", () => {

        /*for (let i = 0; i < 10 ; i++) {

            cy.loginEmail()
            cy.visit('Admin/Campaigns/Campaign/291')

            cy.xpath('(//span[@class="o-icon o-icon--delete"])[1]').click()
            cy.get("#formDeleteSubmit").click({ force: true })
        }*/

    })

})

describe("Tests - Creative Page", () => {
    it("Tests - Edit the creative after deleting it.", () => {
        const editCreativeAndDelete = {
            creativeEditDelete: faker.random.words(2),
            creativeDeleteDescription: faker.random.words(10)
        }

        cy.editCreativeAndDelete(editCreativeAndDelete);

        cy.contains(editCreativeAndDelete.creativeEditDelete)
            .should('not.exist')


        cy.get("#inLabel").type('Creative to edit and delete it')
        cy.get("#Description").type('Creative to edit and delete it')
        //cy.get('select').last().select(9).should('have.value', 'en')
        cy.get("#Create").click()
    })
})

describe("Tests - Creative Page", () => {
    it("Tests - Delete a new creative started from scratch", () => {
        const deleteCreativeStartFromScratch = {
            deleteCreativeFromScratchDescription: faker.random.words(10)
        }

        cy.deleteCreativeStartFromScratch(deleteCreativeStartFromScratch);

        cy.contains('Creative Start From Scratch')
            .should('not.exist')
    })
})

describe("Tests - Creative Page", () => {
    it("Tests - Duplicate a creative", () => {
        const duplicateCreative = {
            creativeName: faker.random.words(1)
        }

        cy.duplicateCreative(duplicateCreative);

        cy.contains(duplicateCreative.creativeName).should('exist')

        cy.clearCookie



    })
})





