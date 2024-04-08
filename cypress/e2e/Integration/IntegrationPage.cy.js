/// <reference types="Cypress"/>

const faker = require('faker')
const noCredentialsNeededIntegrationTypes = ['Delimited file', 'Formatted email', 'Post to web form', 'vCard-format file']
const integrationData = new Map()
integrationData.set('Formatted email', [
    { selector: '#inEmailTo', createValue: () => faker.internet.email() },
    { selector: '#inEmailSubject', createValue: () => faker.random.words(3) }
])
integrationData.set('Post to web form', [
    { selector: '#inFormURL', createValue: () => faker.internet.url() }
])
const generateIntegrationSpecificData = (integrationType) => {
    if (!integrationData.get(integrationType)) return []

    return integrationData.get(integrationType).map(data => ({ selector: data.selector, value: data.createValue() }))
}
describe("Tests - Integration Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    noCredentialsNeededIntegrationTypes.forEach(integrationType => {
        it(`Tests - Create and edit a field mapping for ${integrationType} integration type`, () => {
            const createFieldMappingData = {
                label: faker.datatype.uuid(),
                description: faker.random.words(10),
                integrationType
            }
            cy.createFieldMapping(createFieldMappingData)

            const editFieldMappingData = {
                oldLabel: createFieldMappingData.label,
                oldIntegrationType: createFieldMappingData.integrationType,
                label: faker.datatype.uuid(),
                description: faker.random.words(10)
            }
            cy.editFieldMapping(editFieldMappingData)

            cy.deleteFieldMapping({ label: editFieldMappingData.label })
        })
    })
    noCredentialsNeededIntegrationTypes.forEach(integrationType => {
        it(`Tests - Create and edit a ${integrationType} integration`, () => {
            const createFieldMappingData = {
                label: faker.datatype.uuid(),
                description: faker.random.words(10),
                integrationType
            }
            cy.createFieldMapping(createFieldMappingData)

            const createIntegrationData = {
                fieldMapping: createFieldMappingData.label,
                label: faker.datatype.uuid(),
                description: faker.random.words(10),
                integrationData: generateIntegrationSpecificData(integrationType)
            }
            cy.createIntegration(createIntegrationData)

            const editIntegrationData = {
                oldLabel: createIntegrationData.label,
                oldFieldMapping: createFieldMappingData.label,
                label: faker.datatype.uuid(),
                description: faker.random.words(10),
                integrationData: generateIntegrationSpecificData(integrationType)
            }
            cy.editIntegration(editIntegrationData)
        })

        //Complete scenarios - It is missing TC
    })
})