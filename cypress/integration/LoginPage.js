describe("Tests Login Page", () => {
    beforeEach(() => cy.visit("https://qa.postclickmarketing.com/Admin/Login"));

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it("Test - Tryng to autenticate with correct User ID and password", () => {

        const userId = 'abefortesting'
        const firstName = 'Abe'
        const lastName = 'For Testing'
        const password = 'qwe123QWE!@#'

        cy.get('#txtuserid').type(userId);
        cy.get('#txtpassword').type(password);
        cy.get('button[type=submit]').click();

        cy.get('h1')
            .should("contain", `Welcome back, ${firstName}.`);
    });

    it("Trying to authenticate with correct Email and password", () => {

        //constants
        const email = 'tixixir860@tlhao86.com'
        const firstName = 'Abe'
        const lastName = 'For Testing'
        const password = 'qwe123QWE!@#'

        //actions
        cy.get('#txtuserid').type(email);
        cy.get('#txtpassword').type(password);
        cy.get('button[type=submit]').click();

        //validations
        cy.get('h1')
            .should("contain", `Welcome back, ${firstName}.`);

    });

    it("Trying to authenticate with incorrect User ID", () => {

    });

    it("Trying to authenticate with incorrect password", () => {

    });

    it("Trying to authenticate by not entering any information in the User Id and password fields", () => {

    });

});