/// <reference types="Cypress"/>
const faker = require('faker')

Cypress.Commands.add('visitComponentsLibrary', () => {
    cy.visit('/Admin/Libraries/Snippets')
    
})

Cypress.Commands.add('createNewLabel', input => {
    const {label} = input

    cy.visitComponentsLibrary()

    cy.get('input[class="select2-search__field"]').click()
    cy.get('input[placeholder="New Label"]').type(label)
    cy.get('button[data-action="addLabel"]').click()
    cy.get('data-action="manageLabels"').click()
    cy.contains(label).should('exist')




})
