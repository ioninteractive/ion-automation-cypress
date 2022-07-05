/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('newCreative', input => {

    const { name, description } = input


    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#qs_sources').select(0)
    cy.get('#qs_categories').select(5)
    cy.get('#select-qscat133-11229').click({ force: true })

    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

})

Cypress.Commands.add('createEngagedCreative', input => {
    const { creativeName } = input
    cy.newCreative({ name: creativeName, description: faker.random.words(10) });
    const engageButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section/div[2]/div[1]/div/div/div/form/div/ul/li[2]/button'
    cy.xpath(engageButtonXPath).click({ force: true })
})

Cypress.Commands.add('editCreative', editCreative => {
    cy.visitCampaign()
    const firstCreativeXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[3]/section[1]/div[2]/table/tbody/tr[1]/td[2]/a'
    cy.xpath(firstCreativeXPath).click({ force: true })

    const editButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[2]/a'
    cy.xpath(editButtonXPath).click()


    cy.get("#Label").clear().type(editCreative.label)
    cy.get("#Description").clear().type(editCreative.description)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#FriendlyPathURL").clear().type("/test-rules-Automation")
    cy.get('#AutoPopulateDataScope').select(2)
    for (let i = 0; i < 30; i++) {
        cy.xpath('(//textarea[@autocorrect="off"])[1]').clear({ force: true })
    }
    cy.xpath('(//textarea[@autocorrect="off"])[1]').type('<script>Test</script>')
    for (let i = 0; i < 30; i++) {
        cy.xpath('(//textarea[@autocorrect="off"])[2]').clear({ force: true })
    }
    cy.xpath('(//textarea[@autocorrect="off"])[2]').type('<script>Test</script>')

    cy.xpath("//input[@value='Save']").click()

})

Cypress.Commands.add('copyCreative', input => {
    const { label, description } = input

    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_copy').click()

    cy.get('#creatives').select(2)
    cy.get("#inLabel").type(label)
    cy.get("#Description").type(description)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

})

Cypress.Commands.add('startCreativeFromScratch', input => {
    const { label, description } = input
    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_scratch').click()

    cy.xpath('/html/body/div[2]/div[3]/div[1]/form/div[1]/section[3]/div[1]/ul/li[1]').click()
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test2</script>")
    cy.get("#inLabel").type(label)
    cy.get("#Description").type(description)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

})

//Tests - Delete a creative created using a quick start
Cypress.Commands.add('deleteNewCreative', deletingNewCreative => {

    cy.newCreative(deletingNewCreative)
    cy.wait(500)

    cy.xpath('(//button[@class="c-button c-action-menu__trigger"])[3]').click()
    cy.xpath('(//a[@class="c-button"])[6]').click({ force: true })
    cy.wait(500)
    cy.get('#formDeleteSubmit').click({ force: true })
})


Cypress.Commands.add('editCreativeAndDelete', editCreativeAndDelete => {

    cy.editCreative(editCreativeAndDelete)
    cy.wait(500)
    cy.xpath('//div[@data-region="creativeActions"]').click({ force: true })
    cy.xpath('//a[contains(text(),"Delete")]').click({ force: true })
    cy.wait(500)
    cy.get("#formDeleteSubmit").click({ force: true })

    // //creating a new creative to delete
    // cy.get('a[class="c-button c-button--primary"]').click()
    // cy.get('#qs_sources').select(1)
    // cy.get('#qs_categories').select(5)
    // cy.get('[id=select-qscat146-13474]').click({ force: true })

})

Cypress.Commands.add('deleteCreativeStartFromScratch', input => {
    const { label, description } = input
    cy.startCreativeFromScratch({ label, description })

    cy.contains(label).click({ force: true })
    cy.xpath('(//a[@class="c-button"])[4]').click({ force: true })
    cy.wait(500)
    cy.get("#formDeleteSubmit").click({ force: true })


})

Cypress.Commands.add('duplicateCreative', duplicateCreative => {
    cy.visitCampaign()
    const firstCreativeXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[3]/section[1]/div[2]/table/tbody/tr[1]/td[2]/a'
    cy.xpath(firstCreativeXPath).click({ force: true })

    const actionsButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[2]/div/button'
    cy.xpath(actionsButtonXPath).click({ force: true })
    const duplicateCreativeButtonXPath = '//button[@data-action="duplicateCreative"]'
    cy.xpath(duplicateCreativeButtonXPath).wait(1000).click({ force: true })

    cy.get('#portfolios').select(Cypress.env('portfolioName')).should('be.visible').wait(1000).should('have.value', Cypress.env('portfolioId'))
    cy.get('#campaigns').select(Cypress.env('campaignName')).should('have.value', Cypress.env('campaignId'))
    cy.get('#creativeName').clear().type(duplicateCreative.creativeName)
    cy.xpath('//button[@data-action="confirmDuplicateCreative"]').should('be.visible').click({ force: true })


    cy.wait(2000)
    cy.contains(duplicateCreative.creativeName).click({ force: true })

    /*cy.xpath('(//button[@class="c-button c-action-menu__trigger"])[2]').click({ force: true })
    cy.xpath('(//a[@class="c-button"])[6]').click({ force: true })
    cy.wait(500)
    cy.get("#formDeleteSubmit").click({ force: true })*/

})

Cypress.Commands.add('pageLanguage', languagePage => {

    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#qs_sources').select(0)
    cy.get('#qs_categories').select(5)
    cy.get('#select-qscat133-11229').click({ force: true })

    cy.get("#inLabel").type(languagePage.nameCreative)
    cy.get("#Description").type(languagePage.creativeDescription)
    cy.get('#DefaultLanguage').select(9)
})

/*/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('imageActionURL', creativeName => {

    cy.visit('/Admin/Creative/1518')

    cy.get("#buttonCreativePreview").click()
    cy.xpath("//button[@class='c-button preview-button']").click
    cy.scrollTo('bottom')
    cy.get("#ball_it7Imrv6UE2fQMbbkKXNKQ").click()
    cy.get("#ball_inneriCvIQOvUu3UuyOVIaConCg").click()

})*/
