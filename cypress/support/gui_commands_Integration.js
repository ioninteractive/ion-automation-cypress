/// <reference types="Cypress"/>
require('cypress-xpath')

Cypress.Commands.add('visitIntegrations', () => {
    const integrationsMenuItemXPath = '//*[@id="header"]/nav[1]/ul/li[5]/a'
    cy.xpath(integrationsMenuItemXPath).click()
})

Cypress.Commands.add('createFieldMapping', input => {
    const { label, description, integrationType, copyFrom } = input
    cy.visitIntegrations()
    const newFieldMappingButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/section[4]/div[1]/section[2]/nav/a'
    cy.xpath(newFieldMappingButtonXPath).click()

    cy.get('#Label').type(label)
    cy.get('#Description').type(description)
    cy.get('#ExportTypeId').select(integrationType)
    if (copyFrom) {
        cy.get('#CopyFromId').select(copyFrom)
    }

    const saveButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/form/div/input'
    cy.xpath(saveButtonXPath).click()
    
    cy.visitIntegrations()
    cy.contains(label).click()
    cy.contains('Edit field mapping').click()

    cy.get('#Label').should('have.value', label)
    cy.get('#Description').should('have.value', description)
    cy.get('#ExportTypeId option:selected').should('have.text', integrationType)
    cy.get('#ExportTypeId').should('be.disabled')
})

Cypress.Commands.add('editFieldMapping', input => {
    const { oldLabel, oldIntegrationType, label, description } = input

    cy.visitIntegrations()
    cy.contains(oldLabel).click()
    cy.contains('Edit field mapping').click()

    cy.get('#Label').clear().type(label)
    cy.get('#Description').clear().type(description)
    cy.get('#ExportTypeId').should('be.disabled')
    const saveButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/form/div/input'
    cy.xpath(saveButtonXPath).click()

    cy.visitIntegrations()
    cy.contains(label).click()
    cy.contains('Edit field mapping').click()

    cy.get('#Label').should('have.value', label)
    cy.get('#Description').should('have.value', description)
    cy.get('#ExportTypeId option:selected').should('have.text', oldIntegrationType)
})

Cypress.Commands.add('deleteFieldMapping', input => {
    const { label } = input

    cy.visitIntegrations()
    cy.contains(label).click()
    cy.contains('Edit field mapping').click()

    cy.url().then(url => url.split('/').pop()).as('fieldMappingId')

    cy.visitIntegrations()
    cy.get('@fieldMappingId').then(fieldMappingId => cy.get(`a[href^="/Admin/Integration/ExportFormat/Delete/${fieldMappingId}"]`).click())
    const deleteButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/form/div/input'
    cy.xpath(deleteButtonXPath).click()

    cy.visitIntegrations()
    cy.contains(label).should('not.exist')
})

Cypress.Commands.add('createIntegration', input => {
    const { label, description, fieldMapping, integrationData } = input
    cy.visitIntegrations()
    const integrationsTabButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/section[3]/nav/button[2]'
    cy.xpath(integrationsTabButtonXPath).click()
    const newIntegrationButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/section[5]/div[1]/section[2]/nav/a'
    cy.xpath(newIntegrationButtonXPath).click()
    
    cy.get('#inLabel').type(label)
    cy.get('#inDescription').type(description)
    cy.get('#inExportFormat').select(fieldMapping)
    cy.wait(1500)
    if (integrationData) {
        integrationData.forEach(data => {
            const { selector, value } = data
            cy.get(selector).type(value)
        })
    }

    cy.get('#Submit1').click()

    cy.visitIntegrations()
    cy.xpath(integrationsTabButtonXPath).click()
    cy.contains(label).click()
    
    cy.get('#inLabel').should('have.value', label)
    cy.get('#inDescription').should('have.value', description)
    cy.get('#inExportFormat option:selected').should('have.text', fieldMapping)
    cy.get('#inExportFormat').should('be.disabled')
    if (integrationData) {
        integrationData.forEach(data => {
            const { selector, value } = data
            cy.get(selector).should('have.value', value)
        })
    }
})

Cypress.Commands.add('editIntegration', input => {
    const { oldLabel, oldFieldMapping, label, description, integrationData } = input
    cy.visitIntegrations()
    const integrationsTabButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/section[3]/nav/button[2]'
    cy.xpath(integrationsTabButtonXPath).click()
    cy.contains(oldLabel).click()
    
    cy.get('#inLabel').clear().type(label)
    cy.get('#inDescription').clear().type(description)
    if (integrationData) {
        integrationData.forEach(data => {
            const { selector, value } = data
            cy.get(selector).clear().type(value)
        })
    }

    cy.get('#Submit1').click()

    cy.visitIntegrations()
    cy.xpath(integrationsTabButtonXPath).click()
    cy.contains(label).click()
    
    cy.get('#inLabel').should('have.value', label)
    cy.get('#inDescription').should('have.value', description)
    cy.get('#inExportFormat option:selected').should('have.text', oldFieldMapping)
    cy.get('#inExportFormat').should('be.disabled')
    if (integrationData) {
        integrationData.forEach(data => {
            const { selector, value } = data
            cy.get(selector).should('have.value', value)
        })
    }
})
