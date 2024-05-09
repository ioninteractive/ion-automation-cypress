/// <reference types="Cypress"/>
const faker = require('faker')
require('cypress-xpath')

Cypress.Commands.add('visitComponentsLibrary', () => {
    cy.visit('/Admin/Libraries/Snippets')
    
})

Cypress.Commands.add('createNewLabel', input => {
    const {label} = input

    cy.visitComponentsLibrary()

    cy.get('input[class="select2-search__field"]').click()
    cy.get('input[placeholder="New Label"]').type(label)
    cy.get('button[data-action="addLabel"]').click()
    cy.get('button[data-action="manageLabels"]').click()
    cy.contains(label).should('exist')

    //another way to add a new label
    cy.get('.search-field').type(label)
    cy.get('.library-header__block-input > .btn').click()
    cy.contains(label).should('exist')
})

Cypress.Commands.add('deleteALabel', input =>{
    const {label} = input

    cy.visitComponentsLibrary()

    cy.get('input[class="select2-search__field"]').click()
    cy.get('input[placeholder="New Label"]').type(label)
    cy.get('button[data-action="addLabel"]').click()
    cy.get('button[data-action="manageLabels"]').click()
    cy.contains(label).should('exist')
    cy.get('.library-table__item-delete-btn').as(label).first().click()
    cy.on('window:confirm', () => {
        return true
    })
    cy.contains(label).should('not.exist')
})

Cypress.Commands.add('selectComponentsGroupedByLabels', input => {

})

Cypress.Commands.add('deleteComponents', input => {

})

Cypress.Commands.add('editComponents', input => {

})

Cypress.Commands.add('validateNotcreatinglabelNamesExceed80char', input => {

    const {labelExceed} = input

    cy.visitComponentsLibrary()

    cy.get('input[class="select2-search__field"]').click()
    cy.get('input[placeholder="New Label"]').type(labelExceed)
    cy.get('button[data-action="addLabel"]').click()
    cy.on('window:confirm', () => {
        return true
    })
    cy.get('button[data-action="manageLabels"]').click()
    cy.contains(labelExceed).should('not.exist')

})




