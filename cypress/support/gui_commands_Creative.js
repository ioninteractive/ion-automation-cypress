/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('newCreative', input => {

    const { name, description } = input


    cy.visitCampaign()

    //Accessing 'Add new creative' page and select it
    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#templates_search').type('CLOUD: 4-Assessment Hub')
    cy.get("#select-16212").click({ force: true })

    //Filling 'New creative' page
    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Coastal Blue')
    cy.get('#DefaultLanguage').select('English')
    cy.get("#Create").click()

    //validating the creative generation
    cy.get('div[class="pe-top-bar--logo"]').click({ force: true }) //<----------------- Insert a condition in case the Cookie banner appear.  


})

Cypress.Commands.add('createEngagedCreative', input => {
    const { creativeName } = input
    cy.newCreative({ name: creativeName, description: faker.random.words(10) });
    const engageButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section/div[2]/div[1]/div/div/div/form/div/ul/li[2]/button'
    cy.xpath(engageButtonXPath).click({ force: true })
})

Cypress.Commands.add('editCreative', creative => {
    const { oldName, name, description } = creative
    cy.visitCampaign()
    cy.contains(oldName).click()

    const editButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[2]/a'
    cy.xpath(editButtonXPath).click()


    cy.get("#inLabel").clear().type(name)
    cy.get("#Description").clear().type(description)
    cy.get('#DefaultLanguage').select(9)
    cy.get('span[class="c-input__toggle-btn"]').click()
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

    cy.get('#btnSaveEdit').click()

})

Cypress.Commands.add('copyCreative', input => {
    const { name, description, campaign } = input

    if (campaign) {
        cy.visitPortfolio()
        cy.contains(campaign).click()
    } else {
        cy.visitCampaign()
    }

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_copy').click()

    cy.get('#campaigns').select(Cypress.env('campaignName'))
    cy.get('#creatives_search').type('automated test - copy')
    cy.get("#select-11650").click({ force: true })
    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Coastal Blue')
    cy.get('#DefaultLanguage').select(9)
    cy.get("#Create").click()
})

Cypress.Commands.add('startCreativeFromScratch', input => {
    const { name, description, pagename } = input
    cy.visitCampaign()

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addcreative_scratch').click()

    cy.get('#select-bul_test').click({ force: true })
    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Jana_Ion_QA (legacy)')
    cy.get('#DefaultLanguage').select('English')
    cy.get('#New_FriendlyPathURL').type('/testing')
    cy.get("#Create").click()


    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#tab_addpage_scratch').click()
    cy.xpath('//img[@src="/Global/Templates/ion/bul_test/cp-1_column/cp-1_column_sm.jpg"]').click()
    cy.get("#inLabel").type(pagename)
    cy.get("#Create").click()
    cy.get('div[class="pe-top-bar--logo"]').click({ force: true })

})

Cypress.Commands.add('duplicateCreative', creative => {
    cy.visitCampaign()
    const firstCreativeXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[3]/section[1]/div[2]/table/tbody/tr[1]/td[2]/a'
    cy.xpath(firstCreativeXPath).click({ force: true })

    const actionsButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[2]/div/button'
    cy.xpath(actionsButtonXPath).click({ force: true })
    const duplicateCreativeButtonXPath = '//button[@data-action="duplicateCreative"]'
    cy.xpath(duplicateCreativeButtonXPath).wait(1000).click({ force: true })

    cy.get('#portfolios').select(Cypress.env('portfolioName')).should('be.visible').wait(1000).should('have.value', Cypress.env('portfolioId'))
    cy.get('#campaigns').select(Cypress.env('campaignName')).should('have.value', Cypress.env('campaignId'))
    cy.get('#creativeName').clear().type(creative.name)
    cy.xpath('//button[@data-action="confirmDuplicateCreative"]').should('be.visible').click({ force: true })


    //cy.wait(10000)
    cy.contains(creative.name).click({ force: true })
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

Cypress.Commands.add('deleteCreative', creative => {
    const { name } = creative
    cy.visitCampaign()
    cy.xpath('//button[@data-for-region="creatives"]').wait(500).click({ force: true })
    const clickOnDeleteButton = () => cy.contains(name).parent().siblings().last().children().first().click()
    clickOnDeleteButton()
    cy.get("#formDeleteSubmit").click({ force: true })
})

//Copy Personalization Tests

Cypress.Commands.add('noCopyValidatingMessage', input => {

    const { name, description } = input

    cy.login()
    cy.visit('Admin/Campaigns/Campaign/291')
    cy.get('.c-button--primary').click()
    cy.get('#tab_addcreative_scratch').click()
    cy.wait(1000)
    cy.get('#select-bul_test').click({ force: true })

    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Jana_Ion_QA (legacy)')
    cy.get('#DefaultLanguage').select('English')
    cy.get('#New_FriendlyPathURL').type('/testing')
    cy.get("#Create").click()

    cy.get(':nth-child(3) > .c-page-list__add > .c-button').click()
    cy.get('#tab_addpage_scratch').click()
    cy.wait(1000)
    cy.get('#cp-1_column > .c-thumbnail__img').click()
    cy.get('#inLabel').type('No text')
    cy.get('#Create').click()
    cy.wait(1000)

    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo > .popoutNav > .nav-items > :nth-child(4) > .popoutNav-link > span').click({ force: true })
    cy.get('[data-for-region="personalization"]').click()
    cy.get('[data-region="personalization"] > .c-page-list__add > .c-button').click()


})

Cypress.Commands.add('validatingMessagesWhenFieldsAreEmpty', input => {

    const { name, description } = input

    cy.login()
    cy.visit('Admin/Campaigns/Campaign/291')
    cy.get('.c-button--primary').click()
    cy.get('#templates_search').click().type('CLOUD: 4 Category Assessm')
    cy.get('#select-16206').click({ force: true })

    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Coastal Blue')
    cy.get('#DefaultLanguage').select('English')
    cy.get("#Create").click()


    //cy.get('.mfp-close').
    //cy.get('.notification-banner-dismiss').click()
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo > .popoutNav > .nav-items > :nth-child(4) > .popoutNav-link > span').click({ force: true })
    cy.get('[data-for-region="personalization"]').click()
    cy.get('[data-region="personalization"] > .c-page-list__add > .c-button').click()
    cy.get('.h-align-left > .c-button--save').click()

})

Cypress.Commands.add('validatingCopyPreview', input => {

    const { name, description, copyName, creativeCopy } = input

    cy.login()
    cy.visit('Admin/Campaigns/Campaign/291')
    cy.get('.c-button--primary').click()
    cy.get('#templates_search').click().type('CLOUD: 4 Category Assessm')
    cy.get('#select-16206').click({ force: true })

    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Coastal Blue')
    cy.get('#DefaultLanguage').select('English')
    cy.get("#Create").click()


    //cy.get('.mfp-close').
    //cy.get('.notification-banner-dismiss').click()
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo > .popoutNav > .nav-items > :nth-child(4) > .popoutNav-link > span').click({ force: true })
    cy.get('[data-for-region="personalization"]').click()
    cy.get('[data-region="personalization"] > .c-page-list__add > .c-button').click()

    cy.get('#Label').type(copyName)
    cy.get('#PersonalizationCondition_SelectedLeftOperand').select('Browser language')
    cy.get(':nth-child(1) > #PersonalizationCondition_SelectedRightOperand').select('English')
    cy.get(':nth-child(10) > :nth-child(1) > .c-card__header > .o-icon-chevron-down').click()
    cy.get('#input-text-4').click({ force: true })
    cy.get('#input-text-4').type('Copy test', { force: true }).should('exist')
    cy.get('.o-toggle').click()

})

Cypress.Commands.add('validatingMessageAlertForNoChangesInCopy', input => {

    const { name, description, copyName, creativeCopy } = input

    cy.login()
    cy.visit('Admin/Campaigns/Campaign/291')
    cy.get('.c-button--primary').click()
    cy.get('#templates_search').click().type('CLOUD: 4 Category Assessm')
    cy.get('#select-16206').click({ force: true })

    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Coastal Blue')
    cy.get('#DefaultLanguage').select('English')
    cy.get("#Create").click()


    //cy.get('.mfp-close').
    //cy.get('.notification-banner-dismiss').click()
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo > .popoutNav > .nav-items > :nth-child(4) > .popoutNav-link > span').click({ force: true })
    cy.get('[data-for-region="personalization"]').click()
    cy.get('[data-region="personalization"] > .c-page-list__add > .c-button').click()

    cy.get('#Label').type(copyName)
    cy.get('#PersonalizationCondition_SelectedLeftOperand').select('Browser language')
    cy.get(':nth-child(1) > #PersonalizationCondition_SelectedRightOperand').select('English')
    cy.get(':nth-child(10) > :nth-child(1) > .c-card__header > .o-icon-chevron-down').click()
    cy.get('#input-text-4').click({ force: true })
    cy.get('#input-text-4').type(creativeCopy, { force: true }).should('exist')
    cy.get('.h-align-left > .c-button--save').click()
    cy.get('.personalization-item > .c-card > :nth-child(2) > :nth-child(1) > .c-button').click()
    cy.get('.h-align-left > .c-button--save').click()

})

Cypress.Commands.add('validatingMessageAlertForNoURLAddedInTheCreative', input => {

    const { name, description, copyName } = input

    cy.login()
    cy.visit('Admin/Campaigns/Campaign/291')
    cy.get('.c-button--primary').click()
    cy.get('#templates_search').click().type('CLOUD: 4 Category Assessm')
    cy.get('#select-16206').click({ force: true })

    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Coastal Blue')
    cy.get('#DefaultLanguage').select('English')
    cy.get("#Create").click()


    //cy.get('.mfp-close').
    //cy.get('.notification-banner-dismiss').click()
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo > .popoutNav > .nav-items > :nth-child(4) > .popoutNav-link > span').click({ force: true })
    cy.get('.c-control-bar__status > form > .c-action-menu > .c-action-menu__trigger').contains('Draft')//draft status
    cy.contains('Draft').should('exist')
    cy.get('[data-for-region="personalization"]').click()
    cy.get('[data-region="personalization"] > .c-page-list__add > .c-button').click()

    cy.get('#Label').type(copyName)
    cy.get('#PersonalizationCondition_SelectedLeftOperand').select('URL')
    cy.get('.l-grid > .c-alert > .c-alert__message > h1').contains('Personalization')
    cy.get('.c-alert__message > p').contains("This creative doesn't have a URL. Create one before personalizing the creative.")
    cy.contains('Personalization').should('exist')
    cy.contains("This creative doesn't have a URL. Create one before personalizing the creative.").should('exist')
    cy.get('a.c-breadcrumbs__item').should('exist')
    cy.get('a.c-breadcrumbs__item').click()
    cy.get('.c-control-bar__status > form > .c-action-menu > .c-action-menu__trigger').click()
    cy.get('.c-control-bar__status > form > .c-action-menu > .c-action-menu__items > :nth-child(2) > .c-button').click()
    cy.contains('Live').should('exist')//live status
    cy.get('[data-for-region="personalization"]').click()
    cy.get('[data-region="personalization"] > .c-page-list__add > .c-button').click()
    cy.get('#Label').type(copyName)
    cy.get('#PersonalizationCondition_SelectedLeftOperand').select('URL')


})

Cypress.Commands.add('validatingCopyDropdownOptions', input => {

    const { name, description } = input

    cy.login()
    cy.visit('Admin/Campaigns/Campaign/291')
    cy.get('.c-button--primary').click()
    cy.get('#templates_search').click().type('CLOUD: 4 Category Assessm')
    cy.get('#select-16206').click({ force: true })

    cy.get("#inLabel").type(name)
    cy.get("#Description").type(description)
    cy.get("#Theme").select('Coastal Blue')
    cy.get('#DefaultLanguage').select('English')
    cy.get("#Create").click()


    //cy.get('.mfp-close').
    //cy.get('.notification-banner-dismiss').click()
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo').click({ force: true })
    cy.get('.pe-top-bar--logo > .popoutNav > .nav-items > :nth-child(4) > .popoutNav-link > span').click({ force: true })
    cy.get('.c-control-bar__status > form > .c-action-menu > .c-action-menu__trigger').contains('Draft')//draft status
    cy.contains('Draft').should('exist')
    cy.get('[data-for-region="personalization"]').click()
    cy.get('[data-region="personalization"] > .c-page-list__add > .c-button').click()


    const expectedWhenCopyOptions = ['No conditions required', 'Browser language', 'Browser region', 'Day of week', 'Geolocated country (99% accuracy)', 'Geolocated region (75% accuracy)', 'Geolocated city (70% accuracy)', 'Grade', 'Time of day', 'URL'];

    cy.get('#PersonalizationCondition_SelectedLeftOperand')
        .find('option')
        .then($options => {
            const existingWhenCopyOption = Array.from($options).map(option => option.innerText.trim());

            expect(existingWhenCopyOption).to.deep.eq(expectedWhenCopyOptions)

        })
    cy.get('#PersonalizationCondition_SelectedLeftOperand').select('Browser language')

    const expectedEqualsDifferentOption = ['Equals to', 'Different from'];

    cy.get('#PersonalizationCondition_SelectedOperation')
        .find('option')
        .then($options => {
            const existingEqualsDifferentOption = Array.from($options).map(option => option.innerText.trim());

            expect(existingEqualsDifferentOption).to.deep.eq(expectedEqualsDifferentOption)
        })

        //Later, instead of manually writing the options, use a script to catch and store them. 



    //Validating all dropdowns options

})

