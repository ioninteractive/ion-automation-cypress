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
    cy.xpath('(//span[@style="padding-right: 0.1px;"])[1]').type("<script>Test automation1</script>")
    cy.xpath('(//span[@style="padding-right: 0.1px;"])[2]').type("<script>Test automation2</script>")
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

//Tests - Delete a creative created using a quick start
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
    cy.get('#formDeleteSubmit').click({ force: true })
})


Cypress.Commands.add('editCreativeAndDelete', editCreativeAndDelete => {

    cy.loginEmail()
    cy.visit('Admin/Campaigns/Campaign/291')

    cy.xpath('(//a[@class="txt-title-link"])[1]').click()
    cy.xpath('//a[@class="c-button h-w-100"]').click()



    cy.get("#Label").clear().type(editCreativeAndDelete.creativeEditDelete)
    cy.get("#Description").clear().type(editCreativeAndDelete.creativeDeleteDescription)
    cy.get("#FriendlyPathURL").clear().type("/test-rules-Automation")
    cy.get('select').eq(0).select(2).should('have.id', 'AutoPopulateDataScope')
    cy.xpath('(//span[@style="padding-right: 0.1px;"])[1]').type("<script>Test automation1</script>")
    cy.xpath('(//span[@style="padding-right: 0.1px;"])[2]').type("<script>Test automation2</script>")
    cy.xpath("//input[@value='Save']").click()

    cy.xpath('(//button[@type="button"])[8])').click({ force: true })
    cy.xpath('(//a[@class="c-button"])[6]').click({ force: true })
    cy.wait(500)
    cy.get("#formDeleteSubmit").click({ force: true })

    //creating a new creative to delete
    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('select').eq(0).select(1).should('have.id', 'qs_sources')
    cy.get('select').eq(1).select(5).should('have.id', 'qs_categories')
    cy.get('[id=select-qscat146-13474]').click({ force: true })

})

Cypress.Commands.add('deleteCreativeStartFromScratch', deleteCreativeStartFromScratch => {

    cy.loginEmail()
    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_scratch').click()

    cy.get('#apptix').click()
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test automation</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test automation2</script>")
    cy.get("#inLabel").type('Creative Start From Scratch')
    cy.get("#Description").type(deleteCreativeStartFromScratch.deleteCreativeFromScratchDescription)
    cy.get("#Create").click()

    cy.contains('Creative Start From Scratch').click({ force: true })
    cy.xpath('(//a[@class="c-button"])[4]').click({ force: true })
    cy.wait(500)
    cy.get("#formDeleteSubmit").click({ force: true })


})

Cypress.Commands.add('duplicateCreative', duplicateCreative => {

    /*cy.loginEmail()
    cy.visit('Admin/Campaigns/Campaign/291')

    cy.xpath('(//a[@class="txt-title-link"])[1]').click()

    cy.xpath('(//button[@class="c-button c-action-menu__trigger"])[2]').click({ force: true })
    cy.xpath('(//button[@class="c-button c-action-menu__trigger"])[2]').focused()
    cy.xpath('//button[@data-action="duplicateCreative"]').should('be.visible').click({ force: true })


    cy.get('#portfolios').should('be.visible').click
    cy.get('select').eq(0).select('Regression test').should('have.value', '106')
    cy.get('#campaigns').click
    cy.get('select').eq(1).select('Regression test campaign').should('have.value', '291')
    cy.get('#creativeName').clear().type(duplicateCreative.creativeName)
   
    
    cy.xpath('(//button[@data-action="confirmDuplicateCreative"])').should('be.visible').click
    cy.wait(500)
    cy.xpath('//h3[@class="h-mb-0"]').should('have.text', 'Duplication process was done')
    cy.xpath('//a[contains(text(),"Copy")]').click









    cy.xpath('(//button[@type="button"])[8]').click({ force: true })
    cy.xpath('(//a[@class="c-button"])[6]').click({ force: true })
    cy.wait(500)
    cy.get("#formDeleteSubmit").click({ force: true })

    //creating a new creative to delete
    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('select').eq(0).select(1).should('have.id', 'qs_sources')
    cy.get('select').eq(1).select(5).should('have.id', 'qs_categories')
    cy.get('[id=select-qscat146-13474]').click({ force: true })*/

})


