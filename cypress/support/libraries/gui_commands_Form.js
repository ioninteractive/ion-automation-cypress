/// <reference types="Cypress"/>

Cypress.Commands.add('visitFormsCategories', () => {
    const librariesMenuItemXPath = '//*[@id="header"]/nav[1]/ul/li[3]'
    cy.xpath(librariesMenuItemXPath).click()
    const formsMenuItemXPath = '//*[@id="header"]/nav[1]/ul/li[3]/div/ul/li[4]/a'
    cy.xpath(formsMenuItemXPath).click()
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