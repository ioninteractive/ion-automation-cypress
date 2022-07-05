/// <reference types="Cypress"/>
require('cypress-xpath')

const faker = require('faker')

Cypress.Commands.add('pageLanguage', languagePage => {

    cy.loginEmail()

    cy.visit('Admin/Campaigns/Campaign/291')

    cy.get('a[class="c-button c-button--primary"]').click()
    cy.get('#qs_sources').select(0)
    cy.get('#qs_categories').select(5)
    cy.get('#select-qscat133-11229').click({ force: true })

    cy.get("#inLabel").type(languagePage.nameCreative)
    cy.get("#Description").type(languagePage.creativeDescription)
    cy.get('#DefaultLanguage').select(9)
    

})

Cypress.Commands.add('imageWebp', imageWebp => {

    cy.loginEmail()

    cy.visit('Admin/Libraries/Images?category=1000w&imageId=11786')

    cy.get('a[data-action="button-upload-image"]').wait(1000).click()
    cy.get('#inFile').selectFile('testing.webp')
    cy.get('#inNewCategory').type(imageWebp.webpimage)
    cy.get('#inAnnotation').clear().type('Testing Webp images')
    cy.get('#UploadSubmit').click()    

})

Cypress.Commands.add('imageWebp', imageWebp => {

    cy.loginEmail()

    cy.visit('Admin/Libraries/Images?category=1000w&imageId=11786')

    cy.get('a[data-action="button-upload-image"]').wait(1000).click()
    cy.get('#inFile').selectFile('testing.webp')
    cy.get('#inNewCategory').type(imageWebp.webpimage)
    cy.get('#inAnnotation').clear().type('Testing Webp images')
    cy.get('#UploadSubmit').click()    

})
