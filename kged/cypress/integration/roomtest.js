describe('room creation', function() {
    it('successfully loads', function() {
        cy.visit('https://kged-dev.netlify.com/')
    })
    it('successfully opens the room creation container', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
    })
    it('gives the room a name and creates it', () => {
       // cy.visit('https://kged-dev.netlify.com/')
        //cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
        cy.get("[type='name']").type('huone123')
        cy.get("[type='submit']").click()
        cy.get('div').contains('huone123')
    })
    it('cancels the room creation', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
        cy.get("[type='button']").contains('Peruuta').click()
    })
    it('switches the active room', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'listitem').contains('huone123').click()
        cy.get('div').should('have.class', 'listitem active-listitem').contains('huone123')
    })
    it('deletes a room', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'listitem').contains('huone123').click()

    })

})
// TODO: INTERAKTIOT, KUMOA, TOISTA, TALLENNA, TUO, VIE

describe('item creation', function() {
    it('creates an item', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Esineet').click()
        cy.get("[type='button']").should('have.class', 'm-2 col create-new-btn btn btn-success').first().click()
        cy.get("[type='name']").should('have.class', 'form-control').first().type('esine123')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('esine123')        
    })

})
describe('inspector tests', function(){
    it('changes the name of a room in the inspector', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Huoneet').click()
        cy.get('div').should('have.class', 'listitem').contains('huone123').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('huone246')
        cy.get("[type='submit']").click()
        cy.get('div').contains('huone246')
    })
    it('cancels the edit of the room in inspector', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'listitem').contains('huone246').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('huone123')
        cy.get("[type='button']").contains('Peruuta').click()
        cy.get('div').should('have.class', 'listitem').contains('huone246')
    })
    it('changes the name of an item in the inspector', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Esineet').click()
        cy.get('div').should('have.class', 'listitem').contains('esine123').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('esine246')
        cy.get("[type='submit']").click()
        cy.get('div').contains('esine246') 
    })
})
describe('Furniture testing', function() {
    it('creates a furniture', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click()
        cy.get("[type='button']").should('have.class', 'm-2 col create-new-btn btn btn-success').first().click()
        cy.get("[type='name']").first().type('huonekalu123')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('huonekalu123')  
    })
    it('cancels a furniture creation', () => {
        //cy.visit('https://kged-dev.netlify.com')
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click()
        cy.get("[type='button']").should('have.class', 'm-2 col create-new-btn btn btn-success').first().click()
        cy.get("[type='name']").first().type('huonekalu321')
        cy.get("[type='button']").contains('Peruuta').first().click()
    })
    it('edits the furniture in the inspector', () => {
        cy.get('div').should('have.class', 'listitem').contains('huonekalu123').click()
        cy.get("[type='name']").clear()
        cy.get("[type='name']").type('huonekalu321')
        cy.get('div').should('have.class', 'css-yk16xz-control').first().click()
        cy.get('div').should('have.class', 'css-1e5ysj4').first().click()
        cy.get('div').should('have.class', 'css-yk16zx-control').contains('huone123')
        cy.get("[type='submit']").click()
        cy.get('div').contains('huonekalu321')
    })
})