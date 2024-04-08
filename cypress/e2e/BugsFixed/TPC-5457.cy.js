/*Preview button is not redirecting to home page
https://rock-content.atlassian.net/browse/TPC-5457

Expected behavior: When clicking the preview button, it should open the preview of the Creative in a new tab.*/


/// <reference types="Cypress"/>

const faker = require('faker')

describe("Tests TPC-5457", () => {

    it("Test - Preview button must redirect to Preview page", () => {
        cy.loginEmail()
        cy.visit('Admin/Campaigns/PreviewCreative/5602')
        cy.get('.preview-header > .c-button').click()
        cy.get('.notification-banner-dismiss').click()
        
        cy.contains('creative preview').should('exist')
        cy.contains('edit page').should('exist')
        cy.contains('collected data').should('exist')
        cy.contains('restart').should('exist')


        
    })
})