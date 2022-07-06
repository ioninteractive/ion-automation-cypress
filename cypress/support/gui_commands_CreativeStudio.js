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