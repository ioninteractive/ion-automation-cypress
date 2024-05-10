/// <reference types="Cypress"/>

Cypress.Commands.add('visitWidgets', () => {
    cy.visit('/Admin/Libraries/Widgets')
})

Cypress.Commands.add('createWidget', input => {
    const { name, category, code, variables } = input
    cy.visitWidgets()
    const createWidgetButtonXPath = '//*[@id="wrapper"]/div[3]/div[1]/div/section[2]/nav/a'
    cy.xpath(createWidgetButtonXPath).click()

    cy.get('#name').type(name)
    if(category){        
        cy.wait(1500)
        cy.get('#btn_add_category').click()
        cy.get('#w_newcat').type(category)
    } else {
        cy.xpath('//*[@id="wcat"]/option[2]').invoke('val').as('categoryValue')
        cy.get('#wcat').select(1)
    }
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
    if (category){
        cy.get('#wcat option:selected').should('have.text', category)
    } else {
        cy.get('@categoryValue').then(categoryValue => cy.get('#wcat option:selected').should('have.value', categoryValue))
    }
    cy.contains(code)
    variables.forEach(variable => {
        const variableNameInputXPath = `//*[@id="i_${variable}"]/td[1]/span`
        cy.xpath(variableNameInputXPath).should('have.text', variable)
        const variableLabelInputXPath = `//*[@id="i_${variable}"]/td[2]/span`
        cy.xpath(variableLabelInputXPath).should('have.text', `${variable}-label`)
        cy.contains(`##${variable}`)
    });
})

Cypress.Commands.add('deleteWidget', input => {
    const { name, category } = input
    cy.visitWidgets()
    cy.contains(category).click()
    const clickOnDeleteButton = () => cy.contains(name).parent().siblings().last().children().first().click()
    clickOnDeleteButton()
    cy.get('#formDeleteSubmit').click()
    cy.contains(name).should('not.exist')
})

Cypress.Commands.add('deleteCategory', input => {
    const { category } = input
    cy.visitWidgets()
    const clickOnDeleteButton = () => cy.contains(category).parent().siblings().last().children().first().click()
    clickOnDeleteButton()
    cy.get('#formDeleteSubmit').click()
    cy.contains(category).should('not.exist')
})
