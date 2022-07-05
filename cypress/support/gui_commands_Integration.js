/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('newCreative', creativeName => {

    cy.loginEmail()

    //cy.xpath('//div[@class="sm-close"]').wait(500).click()

    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#qs_sources').select(0)
    cy.get('#qs_categories').select(5)
    cy.get('#select-qscat133-11229').click({ force: true })

    cy.get("#inLabel").type(creativeName.nameCreative)
    cy.get("#Description").type(creativeName.creativeDescription)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

})
