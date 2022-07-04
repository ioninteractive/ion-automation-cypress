Cypress.Commands.add('visitWidgets', () => {
    cy.visit('/Admin/Libraries/Widgets')
})

Cypress.Commands.add('createWidgetWithNewCategory', input => {
    const { name, category, code, variables } = input
    cy.visitWidgets()
    const createWidgetButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section[2]/nav/a'
    cy.xpath(createWidgetButtonXPath).click()

    cy.get('#name').type(name)
    cy.get('#btn_add_category').click()
    cy.get('#w_newcat').type(category)
    const codeToType = [...variables.map(variable => `##${variable}{enter}`), code].join('')
    cy.xpath('//*[@id="wrapper"]/div[3]/div[1]/div[7]/section[1]/div[1]/div[6]/div[1]/div/div/div/div[5]').type(codeToType)

    variables.forEach(variable => {
        const variableNameInputXPath = `//*[@id="i_${variable}"]/td[1]/span/input`
        cy.xpath(variableNameInputXPath).should('have.value', variable)
        const variableLabelInputXPath = `//*[@id="i_${variable}"]/td[2]/span/input`
        cy.xpath(variableLabelInputXPath).type(`${variable}-label`)
        const confirmVariableButtonXPath = `//*[@id="i_${variable}"]/td[5]/span/a[1]`
        cy.xpath(confirmVariableButtonXPath).click()
    });

    const saveButtonIdSelector = '#sub2'
    cy.get(saveButtonIdSelector).click()

    cy.contains(name).click()

    cy.get('#name').should('have.value', name)
    cy.get('#wcat option:selected').should('have.text', category)
    cy.contains(code)
    variables.forEach(variable => {
        const variableNameInputXPath = `//*[@id="i_${variable}"]/td[1]/span/span`
        cy.xpath(variableNameInputXPath).should('have.value', variable)
        const variableLabelInputXPath = `//*[@id="i_${variable}"]/td[2]/span/span`
        cy.xpath(variableLabelInputXPath).should('have.value', `${variable}-label`)
        cy.contains(`##${variable}`)
    });
})
