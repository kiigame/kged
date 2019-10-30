describe('room creation', function() {
    it('successfully loads', function() {
        cy.visit('https://kged-dev.netlify.com/')
    })
    it('successfully opens the room creation container', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
    })
    it('gives the room a name and creates it', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
        cy.get("[type='name']").type('huone123')
        cy.get("[type='submit']").click()
    })
    it('cancels the room creation', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
        cy.get("[type='button']").contains('Peruuta').click()
    })
})
// TODO: INTERAKTIOT, INSPEKTORI, KUMOA, TOISTA, TALLENNA, TUO, VIE

describe('item creation', function() {
    it('creates an item', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Esineet').click()
        cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
        cy.get("[type='name']").type('esine123')
        cy.get("[type='submit']").click()        
    })

})