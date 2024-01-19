/// <reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('visitLogin', () => {
    cy.visit('Admin')
})

Cypress.Commands.add('login', () => {
    cy.visitLogin()

    cy.get('#txtuserid').type(Cypress.env('userId'))
    cy.get('#txtpassword').type(Cypress.env('password'))
    cy.get('button[type=submit]').click()
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().should('have.length', 1).first().should('have.text', 'Home')
})

Cypress.Commands.add('loginEmail', () => {
    cy.visitLogin()

    cy.get('#txtuserid').type(Cypress.env('email'))
    cy.get('#txtpassword').type(Cypress.env('password'))
    cy.get('button[type=submit]').click()
})

Cypress.Commands.add("fillMandatoryFields", data => {
    cy.get("#first-name").type(data.firstName)
    cy.get("#last-name").type(data.lastName)
    cy.get("#email").type(data.email)
    cy.get("#agree").check()
})

Cypress.Commands.add("userIncorrect", loginIncorrectUser => {
    cy.visitLogin()

    cy.get('#txtuserid').type(loginIncorrectUser.userId)
    cy.get('#txtpassword').type(loginIncorrectUser.password)
    cy.get('button[type=submit]').click()
})

Cypress.Commands.add("passwordIncorrect", loginIncorrectPassword => {
    cy.visitLogin()

    cy.get('#txtuserid').type(Cypress.env('userId'))
    cy.get('#txtpassword').type(loginIncorrectPassword.password)
    cy.get('button[type=submit]').click()
})

Cypress.Commands.add("nullFields", () => {
    cy.visitLogin()

    //cy.get('#txtuserid').type(null)
    //cy.get('#txtpassword').type(null)
    cy.get('button[type=submit]').click()
})

Cypress.Commands.add('loginStaySigned', () => {
    cy.visitLogin()

    cy.get('#txtuserid').type(Cypress.env('userId'))
    cy.get('#txtpassword').type(Cypress.env('password'))
    cy.get('span[class="slider round"]').click()
  /*  cy.get('button[type=submit]').click()*/
})

Cypress.Commands.add('forgotPassword', () => {
    cy.visitLogin()

    cy.get('a.login-forgot-password').click()
})

Cypress.Commands.add("userResetIncorrect", resetIncorrectUser => {

    cy.get('#txtuserid').type(resetIncorrectUser.userId)
    cy.get('button[type=submit]').click()
})

//This will be implemented
/*Cypress.Commands.add('loginSSO', () => {
    cy.visit('Admin/Login')

    cy.get('#txtuserid').type(Cypress.env('userId'))
    cy.get('#txtpassword').type(Cypress.env('password'))
    cy.get('button[type=submit]').click()
})*/
Cypress.Commands.add('logout', () => {
    cy.visit('/Admin/Auth/Logout')
})
