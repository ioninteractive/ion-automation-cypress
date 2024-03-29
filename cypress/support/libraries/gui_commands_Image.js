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
    cy.reload(true)
    cy.get('#inReviewCategory option:selected').should('have.value', category)
    assertImageWasUploaded()
})

Cypress.Commands.add('optimizeImage', image => {
    const { category, name } = image
    cy.visitImages()
    cy.wait(3000)
    cy.get('#inReviewCategory').select(category)
    cy.wait(3000)
    cy.get('#inChangeCategory option:selected').should('have.text', category)
    cy.contains(name).click()
    cy.get('#ComboShouldBeOptimized').select('Use optimized image')
    cy.get('input[value="Update"]').click()
    cy.reload(true)
    cy.get('#inReviewCategory option:selected').should('have.text', category)
    cy.get('#ComboShouldBeOptimized option:selected').should('have.text', 'Use optimized image')
})