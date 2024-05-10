/// <reference types="Cypress"/>
const faker = require('faker')

Cypress.Commands.add('visitFormsCategories', () => {
    cy.visit('/Admin/Libraries/FormCategories')
})

Cypress.Commands.add('createFormCategory', input => {
    const { category, description } = input

    cy.visitFormsCategories()

    const newCategoryButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section[2]/nav/a'
    cy.xpath(newCategoryButtonXPath).click()
    cy.get('#FormCategory_Category').type(category)
    cy.get('#FormCategory_Description').type(description)
    const saveButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/section[2]/form/div[3]/input'
    cy.xpath(saveButtonXPath).click()

    cy.visitFormsCategories()

    cy.contains(category).click()
    cy.contains(category).should('exist')
    cy.contains(description).should('exist')
})

Cypress.Commands.add('editFormCategory', input => {
    const { oldCategory, category, description } = input

    cy.visitFormsCategories()

    cy.contains(oldCategory).click()
    const editCategoryButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section[2]/nav/a[1]'
    cy.xpath(editCategoryButtonXPath).click()
    cy.get('#FormCategory_Category').clear().type(category)
    cy.get('#FormCategory_Description').clear().type(description)
    const saveButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/section[2]/form/div[3]/input'
    cy.xpath(saveButtonXPath).click()

    cy.visitFormsCategories()

    cy.contains(category).click()
    cy.contains(category).should('exist')
    cy.contains(description).should('exist')
})

Cypress.Commands.add('createForm', input => {
    const { label, description, category } = input

    const visitCategory = () => {
        cy.visitFormsCategories()
        cy.contains(category).click()
    }
    visitCategory()

    const newFormButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section[2]/nav/a[2]'
    cy.xpath(newFormButtonXPath).click()
    cy.get('#Name').type(label)
    cy.get('#Description').type(description)
    const saveButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/section[2]/form/div[16]/input'
    cy.xpath(saveButtonXPath).click()

    visitCategory()
    cy.contains(label).click()
    cy.contains(label).should('exist')
    cy.contains(description).should('exist')

    //The test above is using Generated type and it is not validating the fields below Description
})

Cypress.Commands.add('editForm', input => {
    const { oldLabel, category, label, description } = input
    const visitForm = formLabel => {
        cy.visitFormsCategories()
        cy.contains(category).click()
        cy.contains(formLabel).click()
    }
    visitForm(oldLabel)
    const optionButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section[2]/nav/nav/button'
    cy.xpath(optionButtonXPath).click()
    const editFormButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section[2]/nav/nav/ul/li[2]/a'
    cy.xpath(editFormButtonXPath).click()

    cy.get('#Name').clear().type(label)
    cy.get('#Description').clear().type(description)
    const saveButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/section[2]/form/div[16]/input'
    cy.xpath(saveButtonXPath).click()

    visitForm(label)
    cy.contains(label).should('exist')
    cy.contains(description).should('exist')
})

Cypress.Commands.add('addFormFields', input => {
    const { category, form, formFields } = input
    const visitForm = () => {
        cy.visitFormsCategories()
        cy.contains(category).click()
        cy.contains(form).click()
    }
    visitForm()

    formFields.forEach(formField => {
        const { dataFieldCategory, dataField } = formField
        const newFormFieldButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/div/section[2]/nav/a'
        cy.xpath(newFormFieldButtonXPath).click()

        cy.get('#DataFieldCategory').select(dataFieldCategory)
        cy.get('#DataField').select(dataField)
        cy.get('#LabelText').type(`${dataField} label`)
        cy.get('#HintText').type(`${dataField} hint`)

        const saveButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/form/div/input'
        cy.xpath(saveButtonXPath).click()
    })

    visitForm()

    formFields.forEach(formField => {
        const { dataFieldCategory, dataField } = formField
        cy.contains(dataField).last().click()
        cy.get('#DataField option:selected').should('have.text', dataField)
        cy.get('#DataFieldCategory option:selected').should('have.text', dataFieldCategory)
        cy.get('#LabelText').should('have.value', `${dataField} label`)
        cy.get('#HintText').should('have.value', `${dataField} hint`)
        cy.go('back')
    })
    
})