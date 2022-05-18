/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('newCreative', creativeName => {

    cy.loginEmail()
    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('select').eq(0).select(1).should('have.id','qs_sources')
    cy.get('select').eq(1).select(5).should('have.id','qs_categories')
    cy.get('[id=select-qscat146-13474]').click({ force: true })

    cy.get("#inLabel").type(creativeName.nameCreative)
    cy.get("#Description").type(creativeName.creativeDescription)
    cy.get("#Create").click()

})