/// <reference types="Cypress"/>

Cypress.Commands.add('imageWebp', imageWebp => {
    cy.visit('Admin/Libraries/Images?category=1000w&imageId=11786')

    cy.get('a[data-action="button-upload-image"]').wait(1000).click()
    cy.get('#inFile').selectFile('testing.webp')
    cy.get('#inNewCategory').type(imageWebp.webpimage)
    cy.get('#inAnnotation').clear().type('Testing Webp images')
    cy.get('#UploadSubmit').click()    

})