/// <reference types="Cypress"/>

Cypress.Commands.add('visitFulfillments', () => {
    cy.visit('/Admin/Libraries/GlobalFulfillmentLibrary/Index')
})

Cypress.Commands.add('uploadFulfillment', input => {
    const { filePath, fileName, category, annotation } = input

    cy.visitFulfillments()
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().should('have.length', 2).first().should('have.text', 'Libraries')
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().eq(1).should('have.text', 'Fulfillment')
    
    cy.wait(1500)
    const uploadButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[1]/section[2]/nav/a'
    cy.xpath(uploadButtonXPath).click()
    cy.get('#FulfillmentFiles').selectFile(filePath)
    cy.get('#NewCategory').type(category)
    cy.get('#Annotation').type(annotation)
    cy.get('#UploadSubmit').click()
    cy.wait(3000)

    cy.contains(fileName)
    cy.visitFulfillments()
    cy.get('#ReviewCategory').select(category)
    cy.get('#ReviewCategory option:selected').should('have.value', category)
    cy.contains(fileName)
})

Cypress.Commands.add('tryToUploadWithoutAFile', input => {
    const {category, annotation } = input

    cy.visitFulfillments()
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().should('have.length', 2).first().should('have.text', 'Libraries')
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().eq(1).should('have.text', 'Fulfillment')
    
    cy.wait(1500)
    const uploadButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[1]/section[2]/nav/a'
    cy.xpath(uploadButtonXPath).click()
    
    cy.get('#NewCategory').type(category)
    cy.get('#Annotation').type(annotation)
    cy.get('#UploadSubmit').click()
    cy.wait(3000)

    cy.contains('Whoa, hold on there...').should ('exist')
    cy.contains('You must provide a file to upload.').should ('exist')
    cy.contains('Due to browser security, you must select your file again.').should ('exist')
    
})


Cypress.Commands.add('deletingAFile', input => {
    const { filePath, fileName, category, annotation } = input

    cy.visitFulfillments()
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().should('have.length', 2).first().should('have.text', 'Libraries')
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().eq(1).should('have.text', 'Fulfillment')
    
    cy.wait(1500)
    const uploadButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div[1]/section[2]/nav/a'
    cy.xpath(uploadButtonXPath).click()
    cy.get('#FulfillmentFiles').selectFile(filePath)
    cy.get('#NewCategory').type(category)
    cy.get('#Annotation').type(annotation)
    cy.get('#UploadSubmit').click()
    cy.wait(3000)

    cy.contains(fileName)
    cy.visitFulfillments()
    cy.get('#ReviewCategory').select(category)
    cy.get('#ReviewCategory option:selected').should('have.value', category)
    cy.contains(fileName)

    cy.get('form > .c-button').click()
    cy.wait(3000)
    cy.contains(category).should('not.exist')
    

    Cypress.Commands.add('moveAFileToAnotherCategory', () => {
        
        cy.visitFulfillments()
        cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().should('have.length', 2).first().should('have.text', 'Libraries')
        cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().eq(1).should('have.text', 'Fulfillment')
        
        
        cy.get('#ChangeCategory').select('Do_not_touch')
        cy.get('#EditSubmit').click()

        cy.contains('Do_not_touch')
        cy.get('[value="70"]').should('have.text', 'online_rpt397.pdf')
        cy.get('#FileDropdown > [selected="selected"]').should('have.text', 'fulfillment-pdf-file.pdf')

        cy.get('form > .c-button').click()


    })



})