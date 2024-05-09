

describe("Tests- Home Page Shortcurts", () => {
    beforeEach(() => {
       cy.loginEmail() 
    })
    it("Tests - Access View all portfolios shortcut", () =>{
       cy.viewAllPortfoliosShortcut()
    })
    it("Tests - Access View Performance Dashboard shortcut", () =>{
        cy.viewPerformanceDashboardShortcut()
     })
     it("Tests - Access New creative shortcut", () =>{
        cy.newCreativeShortcut()
     })
})