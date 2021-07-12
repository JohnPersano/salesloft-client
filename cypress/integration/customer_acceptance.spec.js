
describe("salesloft customer acceptance tests", () => {

    it("navigates to the people data page at the root url", () => {

        cy.visit("http://localhost:3000/");

        cy.contains("SalesLoft Client");
        cy.contains("People Data");

    })

    it("populates the people data table on successful API requests", () => {

        cy.visit("http://localhost:3000/");

        // Intercept the page's AJAX request and ensure its a 200
        cy.intercept("GET", "api/people")
          .as("getPeople");
        cy.wait("@getPeople")
          .its("response.statusCode")
          .should('be.oneOf', [200, 304]);

        // Bad way to see if the table is populated, should check for error/loading/mock data cases
        cy.get("tbody")
          .children()
          .should('have.length.greaterThan', 2);

    });

});
