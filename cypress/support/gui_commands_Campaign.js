Cypress.Commands.add('visitCampaign', () => {
    cy.visit(`Admin/Campaigns/Campaign/${Cypress.env('campaignId')}`)
})
