/// <reference types="Cypress"/>

const faker = require('faker')

const quickStartCreative = {
    name: faker.random.words(3),
    description: faker.random.words(10)
}

const newCopyPersonalization = {

    name: faker.random.words(3),
    description: faker.random.words(10),
    copyName: faker.random.words(3),
    creativeCopy: faker.random.words(2)

}

describe("Tests Copy personalization feature", () => {

    /*it("Test - Validating message when have no copy", () => {

        cy.noCopyValidatingMessage(quickStartCreative)
        cy.get(':nth-child(2) > .c-alert').should('exist')
        cy.contains('Personalization').should('exist')
        cy.contains("This creative doesn't have any copy. Select a different one.").should('exist')

        cy.get('a.c-breadcrumbs__item').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__trigger').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__items > :nth-child(2) > .c-button').click()
        cy.get('#formDeleteSubmit').click()
        cy.contains(quickStartCreative.name).should('not.exist')

    })
    it("Test - Validating message when the fields are empty", () => {

        cy.validatingMessagesWhenFieldsAreEmpty(quickStartCreative)
        cy.get('.o-toggle').should('exist')
        cy.contains('Personalization').should('exist')
        cy.get(':nth-child(2) > .c-alert > .c-alert__message').contains('Personalization name is mandatory.')
        cy.get(':nth-child(2) > .c-alert > .c-alert__message').contains('Condition is mandatory.')
        cy.get(':nth-child(2) > .c-alert > .c-alert__message').contains('At least one element must be personalized in the experience.')

        cy.get('a.c-breadcrumbs__item').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__trigger').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__items > :nth-child(2) > .c-button').click()
        cy.get('#formDeleteSubmit').click()
        cy.contains(quickStartCreative.name).should('not.exist')


    })

    it("Test - Validating copy personalization preview", () => {

        cy.validatingCopyPreview(newCopyPersonalization)
        //cy.get('#preview-page',{ force: true }).contains('Copy test',{ force: true }) - Find a way to interact with the preview page or change the tests to use Selenium.

        cy.get('a.c-breadcrumbs__item').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__trigger').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__items > :nth-child(2) > .c-button').click()
        cy.get('#formDeleteSubmit').click()
        cy.contains(newCopyPersonalization.name).should('not.exist')


    })

    it("Test - Validating message alert for no changes in the copy personalization", () => {

        cy.validatingMessageAlertForNoChangesInCopy(newCopyPersonalization)
        cy.get(':nth-child(2) > .c-alert > .c-alert__message > h1').contains('Personalization')
        cy.get(':nth-child(2) > .c-alert > .c-alert__message').contains('This creative is equal to the original one. Change the copy of at least one text.')
        cy.get('.h-align-left > #leave-personalization').click()
        cy.get('.hdr_bar').contains('Leave personalization')
        cy.get('p').contains('Are you sure you want to leave this page? All the informations not saved will be lost')
        cy.get('.h-align-right > .c-button--save').click()

        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__trigger').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__items > :nth-child(2) > .c-button').click()
        cy.get('#formDeleteSubmit').click()

        //There was a bug with copy not allowing to delete a creative

        cy.contains('Sorry, an internal problem has occurred').should('not.exist')
        //cy.get('a[class="t-admin__brand"]').click({ force: true })
        cy.contains(newCopyPersonalization.name).should('not.exist')


    })*/

    it("Test - Validating message alert for no URL added in the creative", () => {

        cy.validatingMessageAlertForNoURLAddedInTheCreative(newCopyPersonalization)
        cy.contains('Personalization').should('exist')
        cy.contains("This creative doesn't have a URL. Create one before personalizing the creative.").should('exist')

        cy.get('a.c-breadcrumbs__item').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__trigger').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__items > :nth-child(2) > .c-button').click()
        cy.get('#formDeleteSubmit').click()
        cy.contains('Sorry, an internal problem has occurred').should('not.exist')
        cy.contains(newCopyPersonalization.name).should('not.exist')

    })

})

