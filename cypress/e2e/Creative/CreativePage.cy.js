/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests - Creative Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a new Creative using a quick start", () => {
        const creativeName = {
            name: faker.datatype.uuid(),
            description: faker.random.words(10)
        }

        cy.newCreative(creativeName);

        cy.get('span[class="c-breadcrumbs__item"]').contains(creativeName.name)

    })
    it("Tests - Edit the creative created before", () => {
        const editCreative = {
            label: faker.datatype.uuid(),
            description: faker.random.words(10)
        }

        cy.editCreative(editCreative);

        cy.wait(3000)
        cy.get('span[class="c-breadcrumbs__item"]').contains(editCreative.label)

    })
    it("Tests - Copy a page of creative", () => {
        const copyCreative = {
            label: faker.datatype.uuid(),
            description: faker.random.words(10)
        }

        cy.copyCreative(copyCreative);

        cy.get('span[class="c-breadcrumbs__item"]').contains(copyCreative.label)

    })
    it("Tests - Create a new creative from scratch", () => {
        const startCreativeFromScratch = {
            label: faker.datatype.uuid(),
            description: faker.random.words(10)
        }

        cy.startCreativeFromScratch(startCreativeFromScratch);

        cy.get('span[class="c-breadcrumbs__item"]').contains(startCreativeFromScratch.label)

    })
    it("Tests - Deleting a creative created using a quick start", () => {
        const deletingNewCreative = {
            name: faker.datatype.uuid(),
            description: faker.random.words(10)
        }

        cy.deleteNewCreative(deletingNewCreative);


        cy.wait(1000)
        cy.contains(deletingNewCreative.name)
            .should('not.exist')

    })
    // for (let i = 0; i < 30; i++) {
        it("Tests - To delete a creative, only.", () => {
            cy.visitCampaign()

            cy.xpath('(//span[@class="o-icon o-icon--delete"])[1]').click()
            cy.get("#formDeleteSubmit").click({ force: true })
        })
    // }
    it("Tests - Edit the creative after deleting it.", () => {
        const editCreativeAndDelete = {
            label: faker.datatype.uuid(),
            description: faker.random.words(10)
        }

        cy.editCreativeAndDelete(editCreativeAndDelete);
        cy.contains(editCreativeAndDelete.label).should('not.exist')

    })
    it("Tests - Delete a new creative started from scratch", () => {
        const deleteCreativeStartFromScratch = {
            label: faker.datatype.uuid(),
            description: faker.random.words(10)
        }

        cy.deleteCreativeStartFromScratch(deleteCreativeStartFromScratch);

        cy.contains('Creative Start From Scratch')
            .should('not.exist')
    })
    it("Tests - Duplicate a creative", () => {
        const duplicateCreative = {
            creativeName: faker.datatype.uuid()
        }

        cy.duplicateCreative(duplicateCreative);

        cy.get('span[class="c-breadcrumbs__item"]').contains(duplicateCreative.creativeName)
        cy.contains(Cypress.env('portfolioName'))
        cy.contains(Cypress.env('campaignName'))
    })
    it("Tests - Allow selection of page language", () => {
        // const languagePage = {
        //     nameCreative: faker.random.words(1),
        //     creativeDescription: faker.random.words(10)
        // }

        // cy.pageLanguage(languagePage);

        // cy.get('#DefaultLanguage').select(9).should('have.value','en')
        // cy.get("#Create").click()
        // cy.get('span[class="c-breadcrumbs__item"]').contains(languagePage.nameCreative)
        // cy.xpath('//a[contains (text(),"Edit")]').click()
        // cy.get('#DefaultLanguage').select(9).should('have.value','en')
        // cy.get('#DefaultLanguage').select(21).should('have.value','pt')
    })
})






