/// <reference types = "Cypress-iframe"/>
/// <reference types="Cypress"/>
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
    const { creativeName, imageCategory, imageName } = input
    cy.visitCampaign()
    cy.contains(creativeName).click()
    const landingPageXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section/div[2]/ul/li[2]/div/div/div[2]/h4/a'
    cy.xpath(landingPageXPath).click()
    const timeToLoadCreativeStudio = 5000
    cy.wait(timeToLoadCreativeStudio)
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

Cypress.Commands.add('addExternalUrlAction', input => {
    const { url } = input
    const addActionsButtonXPath = '//*[@id="pe_workbench_elements"]/div[2]/div[4]/div'
    cy.xpath(addActionsButtonXPath).click()
    cy.contains('External URL').click()
    const externalUrlInputXPath = '//*[@id="pe_editor_inner"]/div[1]/div/div[3]/div[1]/input'
    cy.xpath(externalUrlInputXPath).type(url)
    cy.get('#btn_save_editor').click()
})