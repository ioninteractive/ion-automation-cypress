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
    cy.visit('/Admin/Creative/1959')

    cy.get('a[href="/Admin/Campaigns/EditPath/2259"]').click()


    cy.get("#Label").clear().type(editCreative.creativeEdit)
    cy.get("#Description").clear().type(editCreative.creativeDescription)
    cy.get("#FriendlyPathURL").clear().type("/test-rules-Automation")
    cy.get('select').eq(0).select(2).should('have.id', 'AutoPopulateDataScope')
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test automation</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test automation2</script>")
    cy.xpath("//input[@value='Save']").click()

})

Cypress.Commands.add('copyCreative', copyCreative => {

    cy.loginEmail()
    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_copy').click()

    cy.get('select').eq(4).select(2).should('have.id', 'creatives')
    cy.get("#inLabel").type(copyCreative.creativeCopy)
    cy.get("#Description").type(copyCreative.creativeCopyDescription)
    cy.get("#Create").click()

})

Cypress.Commands.add('startCreativeFromScratch', startCreativeFromScratch => {

    cy.loginEmail()
    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_scratch').click()

    cy.get('#apptix').click()
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test automation</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test automation2</script>")
    cy.get("#inLabel").type(startCreativeFromScratch.creativeFromScratch)
    cy.get("#Description").type(startCreativeFromScratch.creativeFromScratchDescription)
    cy.get("#Create").click()

})

Cypress.Commands.add('deleteNewCreative', deletingNewCreative => {

    cy.loginEmail()
    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('select').eq(0).select(1).should('have.id', 'qs_sources')
    cy.get('select').eq(1).select(5).should('have.id', 'qs_categories')
    cy.get('[id=select-qscat146-13474]').click({ force: true })

    cy.get("#inLabel").type(deletingNewCreative.newCreativeDeletedName)
    cy.get("#Description").type(deletingNewCreative.creativeDeletedDescription)
    cy.get("#Create").click()

    cy.wait(500)

    cy.xpath('(//button[@class="c-button c-action-menu__trigger"])[3]').click()
    cy.xpath('(//a[@class="c-button"])[6]').click({ force: true })
    cy.wait(500)
    cy.get("#formDeleteSubmit").click({ force: true })
})


