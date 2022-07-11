/// <reference types="Cypress"/>

Cypress.Commands.add('visitImages', () => {
    cy.visit('/Admin/Libraries/Images')
})

Cypress.Commands.add('uploadImage', input => {
    const { filePath, fileName, category, annotation } = input

    cy.visitImages()
    cy.wait(1500)
    const uploadImagesButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[1]/section[2]/nav/a'
    cy.xpath(uploadImagesButtonXPath).click()
    cy.get('#inFile').selectFile(filePath)
    cy.get('#inNewCategory').type(category)
    cy.get('#inAnnotation').type(annotation)
    cy.get('#UploadSubmit').click()
    cy.wait(3000)
    
    const assertImageWasUploaded = () => {
        cy.contains(fileName).click({ force: true })
        // naturalWidth is set when image loads
        cy.get('#PreviewImage').should('be.visible').and($img => expect($img[0].naturalWidth).to.be.greaterThan(0))
    }

    assertImageWasUploaded()
    cy.visitImages()
    cy.get('#inReviewCategory').select(category, { force: true })
    assertImageWasUploaded()
})