describe("Test Front Kawa", () => {
  it("L'article a bien le prix, la description et son titre", () => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:19006/");

    cy.get(".r-backgroundColor-14sbq61 > .css-text-1rynq56").click();

    cy.get(':nth-child(1) > [tabindex="0"] > .r-alignSelf-1kihuf0').should(
      "be.visible"
    );
    cy.get(
      ':nth-child(1) > [tabindex="0"] > .r-alignSelf-1kihuf0 > .r-right-8eqzbf > [data-testid="card-container"] > [data-testid="card"] > .css-text-1rynq56'
    ).should("have.text", "$10.49");

    cy.get(
      ':nth-child(1) > [tabindex="0"] > .r-alignSelf-1kihuf0 > .r-fontSize-ubezar'
    ).should("have.text", "Café en grains Bio");
    cy.get(
      ':nth-child(1) > [tabindex="0"] > .r-alignSelf-1kihuf0 > .r-color-xdvzot'
    ).should(
      "have.text",
      "Grains de café bio certifiés, provenant de sources durables et traçables."
    );
  });

  it("On peut accéder la la description approfondis de l'article", () => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:19006/");

    cy.get(".r-backgroundColor-14sbq61 > .css-text-1rynq56").click();

    cy.get(':nth-child(1) > [tabindex="0"] > .r-alignSelf-1kihuf0')
      .should("be.visible")
      .click();

    cy.get(
      '.r-flex-13awgt0 > .r-alignSelf-1kihuf0 > .r-right-8eqzbf > [data-testid="card-container"] > [data-testid="card"] > .css-text-1rynq56'
    ).should("have.text", "$10.49");

    cy.get(
      ".r-flex-13awgt0 > .r-alignSelf-1kihuf0 > .r-fontSize-ubezar"
    ).should("have.text", "Café en grains Bio");

    cy.get('[data-testid="button"] > .r-alignItems-1awozwy').click();
    cy.get('[data-testid="button"] > .r-alignItems-1awozwy').click();

    cy.get(
      '[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(2) > [style="height: 64px;"] > .r-alignItems-1oszu61 > [style="justify-content: center; align-items: flex-start; margin-left: 0px;"] > .r-cursor-1loqt21'
    ).click();
    cy.get(
      '[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > :nth-child(1) > .r-flex-13awgt0 > .r-transitionProperty-1i6wzkk'
    ).click();

    cy.get(".r-marginVertical-c8eef1").should("have.length", 1);
  });
});
