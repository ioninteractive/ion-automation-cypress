const faker = require('faker')

describe("Tests - Form Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a form category", () => {
        cy.createFormCategory({ category: faker.datatype.uuid(), description: faker.random.words(10) })
    })
    it("Tests - Create and edit a form category", () => {
        const createCategoryData = { category: faker.datatype.uuid(), description: faker.random.words(10) }
        cy.createFormCategory(createCategoryData)
        cy.editFormCategory({ oldCategory: createCategoryData.category, category: faker.datatype.uuid(), description: faker.random.words(10) })
    })
    it("Tests - Create a form", () => {
        cy.createForm({ label: faker.datatype.uuid(), description: faker.random.words(10) })
    })
    it("Tests - Create and edit a form", () => {
        const createFormData = { category: faker.datatype.uuid(), label: faker.datatype.uuid(), description: faker.random.words(10) }
        cy.createForm(createFormData)
        cy.editForm({ category: createFormData.category, oldLabel: createFormData.label, label: faker.datatype.uuid(), description: faker.random.words(10) })
    })
    it("Tests - Create a form and add form fields", () => {
        const createFormData = { category: faker.datatype.uuid(), label: faker.datatype.uuid(), description: faker.random.words(10) }
        cy.createForm(createFormData)

        const formFields = [
            { dataFieldCategoryIndex: 1, dataFieldIndex: 2 },
            { dataFieldCategoryIndex: 1, dataFieldIndex: 4 },
            { dataFieldCategoryIndex: 2, dataFieldIndex: 1 },
        ]
        formFields.forEach(formField => {
            cy.addFormField({
                category: createFormData.category,
                form: createFormData.label,
                dataFieldCategoryIndex: formField.dataFieldCategoryIndex,
                dataFieldIndex: formField.dataFieldIndex
            })
        })
    })
})