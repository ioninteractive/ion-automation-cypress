Cypress.Commands.add('visitCampaign', () => {
    cy.visit(`Admin/Campaigns/Campaign/${Cypress.env('campaignId')}`)
})

Cypress.Commands.add('createCampaign', campaign => {
    const { name, description } = campaign
    cy.visitPortfolio()

    cy.get('a[class="c-button c-button--primary"')
        .contains('New campaign')
        .click()

    cy.get("#InLabel").type(name)
    cy.get("#InDefaultUrl").type("http://testautomation.com")
    cy.get("#InDescription").type(description)
    cy.xpath('(//div[@class="CodeMirror-lines"])[1]').type("<script>Test automation</script>")
    cy.xpath('(//div[@class="CodeMirror-lines"])[2]').type("<script>Test automation2</script>")
    cy.get("input[class='c-button c-button--save']").click()

})

Cypress.Commands.add('deleteCampaign', campaign => {
    const { name } = campaign
    cy.visitPortfolio()

    const clickOnDeleteButton = () => cy.contains(name).parent().siblings().last().children().first().click()
    clickOnDeleteButton()
    cy.get('#formDeleteSubmit').click()
})