/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests Login Page", () => {

    it("Test - Trying to authenticate with the correct User ID and password", () => {
        cy.login()

        cy.get('h1')
            .should("contain", `Welcome back, ${Cypress.env('firstName')}.`);
    });

    it("Trying to authenticate with correct Email and password", () => {
        cy.loginEmail()

        //validations
        cy.get('h1')
            .should("contain", `Welcome back, ${Cypress.env('firstName')}.`);

    });

    it("Trying to authenticate with incorrect User ID", () => {
        const loginIncorrectUser = {
            userId: `${faker.datatype.uuid()}`,
            password: faker.random.words(1)
        }

        cy.userIncorrect(loginIncorrectUser)

        cy.contains('Wrong user ID or password').should('exist')

    });

    it("Trying to authenticate with incorrect password", () => {
        const loginIncorrectPassword = {
            password: faker.random.words(1)
        }

        cy.passwordIncorrect(loginIncorrectPassword)

        cy.contains('Wrong user ID or password').should('exist')
    })

    it("Trying to authenticate by not entering any information in the User Id and password fields", () => {
        cy.nullFields()

        cy.get('.field-validation-error').should('not.be.disabled')
        cy.contains('Invalid User ID').should('exist')
        cy.contains('Wrong user ID or password').should('exist')
    });

    it("Authenticate by checking the Stay signed in option", () => {
        cy.loginStaySigned()

        //to do improve condition of ::before and ::after
        cy.get('span')
            .should('have.class', 'slider round')

        cy.get('button[type=submit]').click()

        cy.get('h1')
            .should("contain", `Welcome back, ${Cypress.env('firstName')}.`);
    });

});

//This will be implemented
/*it(" SSO Test - Trying to authenticate with the correct User ID and password", () => {
    cy.loginStaySigned()

    //to do improve condition of ::before and ::after
    cy.get('span')
        .should('have.class', 'slider round')

    cy.get('button[type=submit]').click()

    cy.get('h1')
        .should("contain", `Welcome back, ${Cypress.env('firstName')}.`);
});*/
