/// <reference types = "Cypress-iframe"/>
/// <reference types="Cypress"/>
/// <reference types="cypress-downloadfile"/>
import 'cypress-iframe'

Cypress.Commands.add('addLibraryFormToCreative', input => {
    const { createFormData, formFields, creativeData } = input
    const createForm = () => {
        cy.createForm(createFormData)
        cy.addFormFields({
            category: createFormData.category,
            form: createFormData.label,
            formFields
        })
    }

    const openCreativeStudio = () => {
        const secondPage = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section/div[2]/ul/li[3]/div/div/div[2]/h4/a'
        cy.xpath(secondPage).click()
        const timeToLoadCreativeStudio = 5000
        cy.wait(timeToLoadCreativeStudio)
    }

    const addFormToCreative = () => {
        cy.get('h2').contains('Forms').trigger('mouseover')
        const libraryFormDraggableXPath = '//*[@id="pe_workbench_palette"]/div/div[3]/div/div[3]/div[2]'
        const positionToDropLibraryForm = { clientX: 250, clientY: 158, screenX: 250, screenY: 158, pageX: 250, pageY: 378 }
        cy.xpath(libraryFormDraggableXPath)
            .trigger("mouseover")
            .trigger("mousedown", { which: 1 })
            .trigger("mousemove", { ...positionToDropLibraryForm })
            .trigger("mouseup", { which: 1, force: true, ...positionToDropLibraryForm })
        
        cy.contains(createFormData.category).click({ force: true })
        cy.contains(createFormData.label).click()
        cy.get('#btn_save_editor').click({ force: true })
    }
    
    const assertFormFieldsArePresentInCreative = () => {
        formFields.forEach(formField => {
            const label = `${formField.dataField} label`
            const hint = `${formField.dataField} hint`
            cy.iframe('#page_iframe').contains(label)
            cy.iframe('#page_iframe').contains(hint)
        })
    }

    createForm()
    cy.newCreative(creativeData)
    openCreativeStudio()
    addFormToCreative()
    assertFormFieldsArePresentInCreative() 
})

Cypress.Commands.add('addImageToCreative', input => {
    const { imageCategory, imageName } = input
    cy.get('h2').contains('Basics').trigger('mouseover')
    const imagesDraggableXPath = '//*[@id="pe_workbench_palette"]/div/div[2]/div/div[3]/div[2]'
    const positionToDrop = { clientX: 250, clientY: 158, screenX: 250, screenY: 158, pageX: 250, pageY: 378 }
    cy.xpath(imagesDraggableXPath)
        .trigger("mouseover")
        .trigger("mousedown", { which: 1 })
        .trigger("mousemove", { ...positionToDrop })
        .trigger("mouseup", { which: 1, force: true, ...positionToDrop })
    cy.contains(imageCategory).click()
    cy.contains(imageName).click()
    cy.wait(3000)
    cy.get('#btn_save_editor').click()
    cy.iframe('#page_iframe').find(`img[src*="${imageName}"]`).should('be.visible').and($img => expect($img[0].naturalWidth).to.be.greaterThan(0))
})

Cypress.Commands.add('addTextToCreative', input => {
    const { text } = input
    cy.get('h2').contains('Basics').trigger('mouseover')
    const textDraggableXPath = '//*[@id="pe_workbench_palette"]/div/div[2]/div/div[3]/div[1]'
    const positionToDrop = { clientX: 250, clientY: 158, screenX: 250, screenY: 158, pageX: 250, pageY: 378 }
    cy.xpath(textDraggableXPath)
        .trigger("mouseover")
        .trigger("mousedown", { which: 1 })
        .trigger("mousemove", { ...positionToDrop })
        .trigger("mouseup", { which: 1, force: true, ...positionToDrop })
    cy.contains('Standard Text').click()
    cy.wait(500)
    cy.get('#pe_std_text').type(text)
    cy.get('#btn_save_editor').click()
    cy.iframe('#page_iframe').contains(text).should('exist')
})

Cypress.Commands.add('visitCreativeStudio', input => {
    const { creativeName } = input
    cy.visitCampaign()
    cy.contains(creativeName).click()
    const landingPageXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section/div[2]/ul/li[2]/div/div/div[2]/h4/a'
    cy.xpath(landingPageXPath).click()
    const timeToLoadCreativeStudio = 5000
    cy.wait(timeToLoadCreativeStudio)
})

Cypress.Commands.add('addExternalUrlAction', input => {
    const { url } = input
    const addActionsButtonXPath = '//*[@id="pe_workbench_elements"]/div[2]/div[4]/div'
    cy.xpath(addActionsButtonXPath).click()
    cy.contains('External URL').click()
    const externalUrlInputXPath = '//*[@id="pe_editor_inner"]/div[1]/div/div[3]/div[1]/input'
    cy.xpath(externalUrlInputXPath).type(url)
    cy.get('#btn_save_editor').click()
})

Cypress.Commands.add('assertExternalUrlAction', input => {
    const { creativeName, imageName, externalUrl } = input
    cy.visitCampaign()
    cy.contains(creativeName).click()
    const livePageUrlXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[4]/div[2]/ul/li[1]/div[2]/span'
    cy.xpath(livePageUrlXPath).then($el => cy.visit($el.text()))
    cy.get(`img[src*="${imageName}"]`).should('be.visible').and($img => expect($img[0].naturalWidth).to.be.greaterThan(0)).click()
    cy.url().should('eq', externalUrl)
})

Cypress.Commands.add('addGoToPageAction', input => {
    const { pageIndex } = input
    const addActionsButtonXPath = '//*[@id="pe_workbench_elements"]/div[2]/div[4]/div'
    cy.xpath(addActionsButtonXPath).click()
    cy.contains('Go to Page').click()
    cy.get('#pe_actions_page_options').select(pageIndex)
    cy.get('#btn_save_editor').click()
})

Cypress.Commands.add('assertGoToPageAction', input => {
    const { creativeName, imageName } = input
    cy.visitCampaign()
    cy.contains(creativeName).click()
    const livePageUrlXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[4]/div[2]/ul/li[1]/div[2]/span'
    cy.xpath(livePageUrlXPath).then($el => cy.visit($el.text()))
    cy.url().as('landingPageUrl')
    cy.get(`img[src*="${imageName}"]`).should('be.visible').and($img => expect($img[0].naturalWidth).to.be.greaterThan(0)).click()
    const matchLandingPageSlashAnything = landingPageUrl => new RegExp(`^${landingPageUrl}\/.+$`)
    cy.get('@landingPageUrl').then(landingPageUrl => cy.url().should('match', matchLandingPageSlashAnything(landingPageUrl)))
})

Cypress.Commands.add('addDownloadFulfillmentAction', input => {
    const { category, fulfillment } = input
    const addActionsButtonXPath = '//*[@id="pe_workbench_elements"]/div[2]/div[4]/div'
    cy.xpath(addActionsButtonXPath).click()
    cy.contains('Download Fulfillment').click()
    cy.get('#pe_actions_fulfillment_category_options').select(category)
    cy.get('#pe_actions_fulfillment_options').select(fulfillment)
    cy.get('#btn_save_editor').click()
})

Cypress.Commands.add('assertDownloadFulfillmentAction', input => {
    const { creativeName, imageName, fulfillmentName, fulfillmentFileContent } = input
    cy.visitCampaign()
    cy.contains(creativeName).click()
    const livePageUrlXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[4]/div[2]/ul/li[1]/div[2]/span'
    cy.xpath(livePageUrlXPath).then($el => cy.visit($el.text()))
    cy.get(`img[src*="${imageName}"]`)
        .should('be.visible')
        .and($img => expect($img[0].naturalWidth).to.be.greaterThan(0))
        .parent()
        .then(anchor => {
            const downloadPageUrl = anchor.prop('href')
            cy.request({ url: downloadPageUrl, encoding: 'binary' })
                .then((response) => {
                    cy.writeFile(`./downloads/${fulfillmentName}`, response.body, 'binary')
                })
            cy.task('getPdfContent', `./downloads/${fulfillmentName}`).then(content => assert.isTrue(content.text.includes(fulfillmentFileContent), 'downloaded fulfillment file content should match with provided file'))
        })
})

Cypress.Commands.add('openImageEditor', input => {
    const { imageName } = input
    cy.iframe('#page_iframe').find(`img[src*="${imageName}"]`).click()
    cy.wait(2000)
})

Cypress.Commands.add('addDownloadPageAsPdfAction', input => {
    const { fileName } = input
    const addActionsButtonXPath = '//*[@id="pe_workbench_elements"]/div[2]/div[4]/div'
    cy.xpath(addActionsButtonXPath).click()
    cy.contains('Download Page as PDF').click()
    const landingPageIndex = 1
    cy.get('#pe_actions_page_options_2').select(landingPageIndex)
    cy.contains('Add filename').click()
    cy.get('input[name="file_name"]').type(fileName)
    cy.get('#btn_save_editor').click()
})

Cypress.Commands.add('assertDownloadPageAsPdfAction', input => {
    const { creativeName, imageName, fileName, pageTextContent } = input
    cy.visitCampaign()
    cy.contains(creativeName).click()
    const livePageUrlXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section/div[4]/div[2]/ul/li[1]/div[2]/span'
    cy.xpath(livePageUrlXPath).then($el => cy.visit($el.text()))
    cy.get(`img[src*="${imageName}"]`)
        .should('be.visible')
        .and($img => expect($img[0].naturalWidth).to.be.greaterThan(0))
        .parent()
        .then(anchor => {
            const downloadPageUrl = anchor.prop('href')
            cy.request({ url: downloadPageUrl, encoding: 'binary' })
                .then((response) => {
                    cy.writeFile(`./downloads/${fileName}`, response.body, 'binary')
                })
            cy.task('getPdfContent', `./downloads/${fileName}`).then(content => assert.isTrue(content.text.includes(pageTextContent), 'downloaded page as pdf should contain image that was inserted'))
        })
})
