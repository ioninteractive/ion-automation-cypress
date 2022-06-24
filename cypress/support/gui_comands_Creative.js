/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('newCreative', creativeName => {


    //cy.xpath('//div[@class="sm-close"]').wait(500).click()

    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#qs_sources').select(0)
    cy.get('#qs_categories').select(5)
    cy.get('#select-qscat133-11229').click({ force: true })

    cy.get("#inLabel").type(creativeName.nameCreative)
    cy.get("#Description").type(creativeName.creativeDescription)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

})

Cypress.Commands.add('createEngagedCreative', input => {
    const { creativeName } = input
    cy.newCreative({ nameCreative: creativeName, creativeDescription: faker.random.words(10) });
    const engageButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section/div[2]/div[1]/div/div/div/form/div/ul/li[2]/button'
    cy.xpath(engageButtonXPath).click({ force: true })
})

Cypress.Commands.add('editCreative', editCreative => {

    cy.visit('/Admin/Creative/1983')

    cy.get('a[href="/Admin/Campaigns/EditPath/2283"]').click()


    cy.get("#Label").clear().type(editCreative.creativeEdit)
    cy.get("#Description").clear().type(editCreative.creativeDescription)
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

Cypress.Commands.add('copyCreative', copyCreative => {

    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_copy').click()

    cy.get('#creatives').select(2)
    cy.get("#inLabel").type(copyCreative.creativeCopy)
    cy.get("#Description").type(copyCreative.creativeCopyDescription)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

})

Cypress.Commands.add('startCreativeFromScratch', startCreativeFromScratch => {

    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_scratch').click()

    cy.get('#apptix').click()
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test2</script>")
    cy.get("#inLabel").type(startCreativeFromScratch.creativeFromScratch)
    cy.get("#Description").type(startCreativeFromScratch.creativeFromScratchDescription)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

})

//Tests - Delete a creative created using a quick start
Cypress.Commands.add('deleteNewCreative', deletingNewCreative => {

    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#qs_sources').select(1)
    cy.get('#qs_categories').select(5)
    cy.get('[id=select-qscat146-13474]').click({ force: true })

    cy.get("#inLabel").type(deletingNewCreative.newCreativeDeletedName)
    cy.get("#Description").type(deletingNewCreative.creativeDeletedDescription)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

    cy.wait(500)

    cy.xpath('(//button[@class="c-button c-action-menu__trigger"])[3]').click()
    cy.xpath('(//a[@class="c-button"])[6]').click({ force: true })
    cy.wait(500)
    cy.get('#formDeleteSubmit').click({ force: true })
})


Cypress.Commands.add('editCreativeAndDelete', editCreativeAndDelete => {

    cy.visitCampaign()

    cy.xpath('(//a[@class="txt-title-link"])[1]').click()
    cy.xpath('//a[@class="c-button h-w-100"]').click()

    cy.get("#Label").clear().type(editCreativeAndDelete.creativeEditDelete)
    cy.get("#Description").clear().type(editCreativeAndDelete.creativeDeleteDescription)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#FriendlyPathURL").clear().type("/test-rules-Automation")
    cy.get('#AutoPopulateDataScope').select(2)
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test</script>")
    cy.xpath("//input[@value='Save']").click()
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

Cypress.Commands.add('deleteCreativeStartFromScratch', deleteCreativeStartFromScratch => {

    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_scratch').click()

    cy.get('#apptix').click()
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test2</script>")
    cy.get("#inLabel").type('Creative Start From Scratch')
    cy.get("#Description").type(deleteCreativeStartFromScratch.deleteCreativeFromScratchDescription)
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()

    cy.contains('Creative Start From Scratch').click({ force: true })
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

Cypress.Commands.add('createURL', input => {
    const { urlCreate, creativeId } = input
    cy.visitCampaign()

    cy.xpath('//a[@data-region="url-button"]').click({ force: true })
    cy.get('#inDomain').select(17)
    cy.get('#inSlashName').type(urlCreate)
    cy.get('#inMediaType').select(1)
    cy.get('#inVehicle').select('Email')
    if(creativeId) {
        cy.get(`#pt${creativeId}`).click({ force: true })
    }
    cy.xpath('//input[@type="submit"]').click({ force: true })
})

Cypress.Commands.add('editURL', editURLInput => {
    const { urlName, isRedirectType301, seoType, isRespondentsAlwaysNew, description, defaultURL, sitemapPriority, mediaTypeIndex, vehicleIndex, domainIndex } = editURLInput
    const visitFirstUrlEditPage = () => {
        cy.visitCampaign()
        const firstUrlFullXPath = '/html/body/div[4]/div[3]/div[1]/div[3]/section[2]/div[2]/table/tbody/tr[1]/td[1]/a'
        cy.xpath(firstUrlFullXPath).click({ force: true })
        const editButtonFullXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[1]/div[2]/section[2]/div/a'
        cy.wait(2000).then(_ => cy.xpath(editButtonFullXPath).click({ force: true }))
    }

    visitFirstUrlEditPage()

    const editURL = () => {
        if (isRedirectType301) {
            cy.get('#inRedirect301Y').check({ force: true })
        } else {
            cy.get('#inRedirect301N').check({ force: true })
        }
    
        switch (seoType) {
            case 'Always':
                cy.get('#inInSitemapA').check({ force: true })
                break;
            case 'Never':
                cy.get('#inInSitemapN').check({ force: true })
                break;
            default:
                cy.get('#inInSitemapP').check({ force: true })
                break;
        }
    
        if (isRespondentsAlwaysNew) {
            cy.get('#inAlwaysNewY').check({ force: true })
        } else {
            cy.get('#inAlwaysNewN').check({ force: true })
        }
    
        cy.get('#inSlashName').clear().type(urlName)
        cy.get('#inDescription').clear().type(description)
        cy.get('#inDefaultURL').clear().type(defaultURL)
        cy.get('#inSitemapPriority').select(sitemapPriority)
        cy.get('#inDomain').select(domainIndex).then(option => option.val()).as('expectedDomain')
        cy.get('#inMediaType').select(mediaTypeIndex).then(option => option.val()).as('expectedMediaType')
        cy.get('#inVehicle').select(vehicleIndex).then(option => option.val()).as('expectedVehicle')
    }
    editURL()

    //save
    cy.get('#btn_ts_save_edit').click({ force: true })

    visitFirstUrlEditPage()
    const assertURLWasEdited = () => {
        if (isRedirectType301) {
            cy.get('#inRedirect301Y').should('be.checked')
        } else {
            cy.get('#inRedirect301N').should('be.checked')
        }
    
        switch (seoType) {
            case 'Always':
                cy.get('#inInSitemapA').should('be.checked')
                break;
            case 'Never':
                cy.get('#inInSitemapN').should('be.checked')
                break;
            default:
                cy.get('#inInSitemapP').should('be.checked')
                break;
        }
    
        if (isRespondentsAlwaysNew) {
            cy.get('#inAlwaysNewY').should('be.checked')
        } else {
            cy.get('#inAlwaysNewN').should('be.checked')
        }        
        
        cy.get('#inSlashName').should('have.value', urlName)
        cy.get('#inDescription').should('have.value', description)
        cy.get('#inDefaultURL').should('have.value', defaultURL)
        cy.get('#inSitemapPriority option:selected').should('have.value', sitemapPriority)
        cy.get('@expectedDomain').then(expectedDomain => cy.get('#inDomain').should('have.value', expectedDomain))
        cy.get('@expectedMediaType').then(expectedMediaType => cy.get('#inMediaType').should('have.value', expectedMediaType))
        cy.get('@expectedVehicle').then(expectedVehicle => cy.get('#inVehicle').should('have.value', expectedVehicle))
    }

    assertURLWasEdited()
})



