const faker = require('faker')

const formCategory = {
    category : faker.datatype.uuid(),
    description: faker.random.words(10)
}
const form = {
    label : faker.datatype.uuid(),
    description: faker.random.words(10)
}
describe("Tests - Form Page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    it("Tests - Create a form category", () => {
        cy.createFormCategory(formCategory)
    })
    it("Tests - Edit a form category", () => {
        const newCategory = faker.datatype.uuid()
        cy.editFormCategory({ oldCategory: formCategory.category, category: newCategory, description: faker.random.words(10) })
        formCategory.category = newCategory
    })
    it("Tests - Create a form", () => {
        cy.createForm({ ...form, category: formCategory.category })
    })
    it("Tests - Edit a form", () => {
        const newLabel = faker.datatype.uuid()
        cy.editForm({ category: formCategory.category, oldLabel: form.label, label: newLabel, description: faker.random.words(10) })
        form.label = newLabel
    })
    it("Tests - Add form fields to form", () => {
        const formFields = [
            { dataFieldCategory: 'Contact info', dataField: 'Job title'},
            { dataFieldCategory: 'Contact info', dataField: 'Last name' },
            { dataFieldCategory: 'Contact info (address)', dataField: 'Country' },
        ]
        cy.addFormFields({
            category: formCategory.category,
            form: form.label,
            formFields
        })
    })

    
})