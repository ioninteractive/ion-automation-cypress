const faker = require('faker')
const images = [
    './cypress/files/png-image.png',
    './cypress/files/webp-image.webp',
    './cypress/files/jpg-image.jpg',
    './cypress/files/gif-image.gif',
    './cypress/files/svg-image.svg'
]

describe("Tests - Image page", () => {
    beforeEach(() => {
        cy.loginEmail()
    })
    images.forEach(image => {
        it(`Tests - Insert a ${image.split('.').pop()} image in the library `, () => {
            cy.uploadImage({
                filePath: image,
                fileName: image.split('/').pop(),
                category: faker.datatype.uuid().replaceAll('-', ''),
                annotation: faker.random.words(10)
            })
        })
    })
})