// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("createRoom", (name) => {
    cy.get('.tab-list-item').contains('Huoneet').click();
    cy.get('.create-new-btn').click();
    cy.get("[placeholder='Syötä huoneen nimi']").type(name);
    cy.get('.btn-success').contains('Lisää huone').click();
});

Cypress.Commands.add("createStartingRoom", (name) => {
    cy.createRoom(name);
    cy.get('.col-lg-2 > :nth-child(1) > .row > :nth-child(1)').click();
    cy.get('.listitem').contains(name).click();
    cy.get('#startRoom').click();
    cy.get('.item-edit-actions > .btn-success').click();
});

Cypress.Commands.add("createItem", (name) => {
    cy.get('.tab-list-item').contains('Esineet').click();
    cy.get('.create-new-btn').click();
    cy.get("[placeholder='Syötä esineen nimi']").type(name);
    cy.get('.btn-success').contains('Lisää esine').click();
});

Cypress.Commands.add("createFurniture", (name) => {
    cy.get('div').contains('Huonekalut').click();
    cy.get('.create-new-btn').click();
    cy.get("[placeholder='Syötä huonekalun nimi']").first().type(name);
    cy.get('.btn-success').contains('Lisää huonekalu').click();
});