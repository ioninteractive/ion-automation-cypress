Cypress.Commands.add('createURL', input => {
    const { urlCreate, creativeId, chooseFirstCreative } = input
    cy.visitCampaign()

    cy.xpath('//a[@data-region="url-button"]').click({ force: true })
    cy.get('#inDomain').select(Cypress.env('domainName'))
    cy.get('#inSlashName').type(urlCreate)
    cy.get('#inMediaType').select(1)
    cy.get('#inVehicle').select('Email')
    if(creativeId) {
        cy.get(`#pt${creativeId}`).click({ force: true })
    }
    if(chooseFirstCreative) {
        const firstCreativeXPath = '/html/body/div[4]/div[3]/div[1]/form/section[2]/div/div[2]/ul/li[1]'
        cy.xpath(firstCreativeXPath).click({ force: true })
    }
    cy.xpath('//input[@type="submit"]').click({ force: true })
})

Cypress.Commands.add('editURL', editURLInput => {
    const { urlName, isRedirectType301, seoType, isRespondentsAlwaysNew, description, defaultURL, sitemapPriority, mediaTypeIndex, vehicleIndex, domainIndex } = editURLInput
    const visitFirstUrlEditPage = () => {
        cy.visitCampaign()
        const firstUrlFullXPath = '/html/body/div[4]/div[3]/div[1]/div[3]/section[2]/div[2]/table/tbody/tr[1]/td[1]/a'
        cy.xpath(firstUrlFullXPath).click({ force: true })
    }
    const openEditPage = () => {
        const editButtonFullXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[1]/div[2]/section[2]/div/a'
        cy.wait(2000).then(_ => cy.xpath(editButtonFullXPath).click({ force: true }))
    }


    visitFirstUrlEditPage()
    openEditPage()

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
    cy.wait(3000)

    cy.reload(true)
    openEditPage()
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