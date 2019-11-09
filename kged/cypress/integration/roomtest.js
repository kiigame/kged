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
        cy.get('div').contains('huone123')
    })
    it('cancels the room creation', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
        cy.get("[type='button']").contains('Peruuta').click()
    })
    it('deletes a room', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'listitem').contains('object_layer_wc_1').click()
        cy.get('span').should('have.class', 'trash').parent().should('have.class','active-listitem').click()
    })
})
// TODO: INTERAKTIOT, INSPEKTORI, KUMOA, TOISTA, TALLENNA, TUO, VIE
describe('switching the active room/item', function(){
    it('switches the active room', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'listitem').contains('object_layer_wc_2').click()
        cy.get('div').should('have.class', 'listitem active-listitem').contains('object_layer_wc_2')
    })
})


describe('item creation', function() {
    it('creates an item', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Esineet').click()
        cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
        cy.get("[type='name']").type('esine123')
        cy.get("[type='submit']").click()
        cy.get('div').contains('esine123')        
    })

})
describe('inspector tests', function(){
    it('changes the name of a room in the inspector', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'listitem').contains('object_layer_wc_1').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('huone123')
        cy.get("[type='submit']").click()
        cy.get('div').contains('huone123')
    })
    it('cancels the edit of the room in inspector', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'listitem').contains('object_layer_wc_1').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('huone123')
        cy.get("[type='button']").contains('Peruuta').click()
        cy.get('div').should('have.class', 'listitem').contains('object_layer_wc_1')
    })
    it('changes the name of an item in the inspector', () => {
        cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Esineet').click()
        cy.get('div').should('have.class', 'listitem').contains('airfreshener').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('esine123')
        cy.get("[type='submit']").click()
        cy.get('div').contains('esine123') 
    })
})