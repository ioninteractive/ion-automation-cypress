/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('newCreative', creativeName => {

    cy.loginEmail()
    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('select').eq(0).select(1).should('have.id', 'qs_sources')
    cy.get('select').eq(1).select(5).should('have.id', 'qs_categories')
    cy.get('[id=select-qscat146-13474]').click({ force: true })

    cy.get("#inLabel").type(creativeName.nameCreative)
    cy.get("#Description").type(creativeName.creativeDescription)
    cy.get("#Create").click()

})

Cypress.Commands.add('editCreative', editCreative => {

    cy.loginEmail()
    cy.visit('/Admin/Creative/1519')

    cy.get('a[href="/Admin/Campaigns/EditPath/1837"]').click()

    cy.get("#Label").type(editCreative.creativeEdit)
    cy.get("#Description").type(editCreative.creativeDescription)
    cy.get("#FriendlyPathURL").type("/test-rules-Automation")
    cy.get('select').eq(0).select(2).should('have.id', 'AutoPopulateDataScope')
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test automation</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test automation2</script>")
    cy.xpath("//input[@value='Save']").click()

})