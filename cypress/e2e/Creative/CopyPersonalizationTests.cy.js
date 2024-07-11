/// <reference types="Cypress"/>

const faker = require('faker')

const quickStartCreative = {
    name: faker.datatype.uuid(),
    description: faker.random.words(10)
}

describe("Tests Copy personalization feature", () => {

    it("Test - Validating message when have no copy", () => {

        cy.noCopyValidatingMessage(quickStartCreative)
        /*cy.get(':nth-child(2) > .c-alert').should('exist')
        cy.contains('Personalization').should('exist')
        cy.contains("This creative doesn't have any copy. Select a different one.").should('exist')*/

    })
    it("Test - Validating message when the fields are empty",() => {

        cy.validatingMessagesWhenFieldsAreEmpty(quickStartCreative)
        cy.contains('Personalization').should('exist')
        cy.get(':nth-child(2) > .c-alert > .c-alert__message').contains('Personalization name is mandatory.')
        cy.get(':nth-child(2) > .c-alert > .c-alert__message').contains('Condition is mandatory.')
        cy.get(':nth-child(2) > .c-alert > .c-alert__message').contains('At least one element must be personalized in the experience.')
        cy.get('a.c-breadcrumbs__item').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__trigger').click()
        cy.get('.h-d-flex > .c-action-menu > .c-action-menu__items > :nth-child(2) > .c-button').click()
        cy.get('#formDeleteSubmit').click()



        


        
    })
})

