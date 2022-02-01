/// <reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('login', () => {
    cy.visit('Admin/Login')

    cy.get('#txtuserid').type(Cypress.env('userId'))
    cy.get('#txtpassword').type(Cypress.env('password'))
    cy.get('button[type=submit]').click()
})

Cypress.Commands.add('loginEmail', () => {
    cy.visit('Admin/Login')

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
    cy.visit('Admin/Login')

    cy.get('#txtuserid').type(loginIncorrectUser.userId)
    cy.get('#txtpassword').type(loginIncorrectUser.password)
    cy.get('button[type=submit]').click()
})

Cypress.Commands.add("passwordIncorrect", loginIncorrectPassword => {
    cy.visit('Admin/Login')

    cy.get('#txtuserid').type(Cypress.env('userId'))
    cy.get('#txtpassword').type(loginIncorrectPassword.password)
    cy.get('button[type=submit]').click()
})

Cypress.Commands.add("nullFields", () => {
    cy.visit('Admin/Login')

    //cy.get('#txtuserid').type(null)
    //cy.get('#txtpassword').type(null)
    cy.get('button[type=submit]').click()
})

