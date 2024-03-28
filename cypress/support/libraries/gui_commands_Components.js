/// <reference types="Cypress"/>

Cypress.Commands.add('visitComponentsLibrary', () => {
    cy.visit('/Admin/Libraries/Snippets')
})


Cypress.Commands.add('createComponentLabel', componentsLabel => {
    const {label} = componentsLabel

    cy.visitComponentsLibrary()
    cy.get('.select2-selection').click()
    cy.get('.select2-label-add > input').type(label)


})