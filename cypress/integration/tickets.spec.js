describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("fills all the text input fields", () => {
        const firstName = "Pedro"
        const lastName = "Faria"
        const email = "pedro.faria@rockcontent.com"

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type(email);
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type("Pedro Faria");
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("Select 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    it("Select option friend and publication check box and then uncheck option friend", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
            .as("email")
            .type("teste-.com.br");

        cy.get("#email.invalid")
            .as("invalidEmail")
            .should("exist");

        cy.get("@email")
            .clear()
            .type("pedrofaria.mc@gmail.com")
            .as("validEmail");

        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the fore", () => {
        const firstName = "Pedro";
        const lastName = "Faria";
        const fullName = `${firstName} ${lastName}`;
        const email = "pedro.faria@rockcontent.com";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type(email);
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("IPA beer");

        cy.get(".agreement p").should
            ("contain",
                `I, ${fullName}, wish to buy 2 VIP tickets.`
            );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']").click();


        cy.get("@submitButton").should("be.disabled");

    });

    it("fills mandatory fields using support comand", () => {

        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joaosilva@example.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");

    });
});