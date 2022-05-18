/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('portfolioCreate', portfolioName => {

    cy.loginEmail()
    cy.visit('Admin/portfolios')

    cy.get('a[class="c-button c-button--primary"]').click()

    cy.get("#inLabel").type(portfolioName.namePortfolio)
    cy.get("#inDescription").type(portfolioName.portfolioDescription)
    cy.get("#Submit1").click()

})

Cypress.Commands.add('portfolioEdit', portfolioEditName => {

    cy.loginEmail()
    cy.visit('Admin/portfolios')

    cy.xpath('(//a[@class="txt-title-link"])[1]')
        .click()
    cy.get('a[class="c-button"]')
        .contains('Edit portfolio')
        .click()
    cy.get("#inLabel").type(portfolioEditName.nameEditPortfolio)
    cy.get("#inDescription").type(portfolioEditName.portfolioEditDescription)
    cy.get("#Submit1").click()

    //to do setando novamente o valor inicial
    cy.get('a[class="c-button"]')
        .contains('Edit portfolio')
        .click()
    cy.get("#inLabel").clear()
    cy.get("#inLabel").type('* ion AForTesting')
    cy.get("#Submit1").click()

})



Cypress.Commands.add('portfolioDelete', portfolioName => {


    //cy.get('a:contains(Portfolios)').click()

    //cy.get("#inLabel").type(portfolioName.namePortfolio)
    //cy.get("#inDescription").type(portfolioName.portfolioDescription)
    //cy.get("#Submit1").click()

})

// ------------------------------------------------------------------------ Comandos da campanha

Cypress.Commands.add('campaignCreate', campaignName => {

    cy.loginEmail()
    cy.visit('Admin/portfolios/49')

    cy.get('a[class="c-button c-button--primary"')
        .contains('New campaign')
        .click()

    cy.get("#InLabel").type(campaignName.nameCampaign)
    cy.get("#InDefaultUrl").type("http://testautomation.com")
    cy.get("#InDescription").type(campaignName.campaignDescription)
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test automation</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test automation2</script>")
    cy.get("input[class='c-button c-button--save']").click()

})

Cypress.Commands.add('campaignDelete', () => {
    cy.loginEmail()
    cy.visit('Admin/portfolios/49')

    cy.xpath('(//span[@class="o-icon o-icon--delete"])[1]').click()
    cy.get('#formDeleteSubmit').click()
})