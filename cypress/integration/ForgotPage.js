/// <reference types="Cypress" />

const faker = require('faker')

describe("Tests Login Page", () => {

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
            userId: `${faker.random.uuid()}`,
            /*password: faker.random.words(1)*/
        }

        cy.forgotPassword()

        cy.userResetIncorrect(resetIncorrectUser)

        cy.get('label.reset-error-subtitle')
            .should('be.visible')

    })

    it("Fill in a federated userID and reset the password.", () => {
        cy.forgotPassword()

        cy.get('#txtuserid').type("pedro.faria@rockcontent.com")
        cy.get('button[class="reset-request-submit"]').click()

        cy.get('label.reset-success-title')
            .should('be.visible')

    })

    it.only("Fill in the field with Email of a non-federated user and reset the password.", () => {
        cy.forgotPassword()

        cy.get('#txtuserid').type("pedro.test")
        cy.get('button[class="reset-request-submit"]').click()

        cy.get('label.reset-success-title')
            .should('be.visible')
    })
})