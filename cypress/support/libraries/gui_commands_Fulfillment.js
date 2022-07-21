/// <reference types="Cypress"/>

Cypress.Commands.add('visitFulfillments', () => {
    cy.visit('/Admin/Libraries/GlobalFulfillmentLibrary/Index')
})

Cypress.Commands.add('uploadFulfillment', input => {
    const { filePath, fileName, category, annotation } = input

    cy.visitFulfillments()
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().should('have.length', 3).first().should('have.text', 'Dashboard')
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().eq(1).should('have.text', 'Libraries')
    cy.get('div[class="c-breadcrumbs t-admin__breadcrumbs"]').children().eq(2).should('have.text', 'Fulfillment')
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