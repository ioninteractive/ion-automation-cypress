/// <reference types="Cypress" />

const faker = require('faker')

describe("Tests Login Page - Forgot your password", () => {

    it("Trying to recover password without filling in user id or email", () => {
        cy.forgotPassword()

        cy.get('#txtuserid').clear()
        cy.get('button.reset-request-submit').click()

        cy.contains('Username or e-mail is required.')
            .should('be.visible')

        cy.get('a.reset-request-link').click()

        cy.get('h4.login-title')
            .should('be.visible')
    })

    it("Fill in an invalid user in the User id field and try to reset the password.", () => {
        const resetIncorrectUser = {
            userId: `${faker.datatype.uuid()}`,
            /*password: faker.random.words(1)*/
        }

        cy.forgotPassword()

        cy.userResetIncorrect(resetIncorrectUser)

        cy.get('label.reset-error-subtitle')
            .should('be.visible')

    })

    it("Fill in a federated userID and reset the password.", () => {
        cy.forgotPassword()

        cy.get('#txtuserid').type(Cypress.env('federatedAccountToResetPassword'))
        cy.get('button[class="reset-request-submit"]').click()

        cy.get('label.reset-success-title')
            .should('be.visible')

    })

    it("Fill in the field with Email of a non-federated user and reset the password.", () => {
        cy.forgotPassword()

        //cy.get('#txtuserid').type(Cypress.env('notFederatedAccountToResetPassword'))
        cy.get('#txtuserid').type('janainaqaion@gmail.com')
        cy.get('button[class="reset-request-submit"]').click()

        cy.get('label.reset-success-title')
            .should('be.visible')
    })

})