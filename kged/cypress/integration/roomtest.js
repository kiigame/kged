describe('room creation', function() {
    it('successfully loads', function() {
        cy.visit('https://kged.netlify.com/')
    })
    it('shows the play button as inactive', () => {
        cy.get('.disabled').contains('Käynnistä')
    })
    it('successfully opens the room creation container', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('.create-new-btn').click()    
    })
    it('gives the room a name and creates it', () => {
       // cy.visit('https://kged-dev.netlify.com/')
        //cy.get('button').should('have.class', 'm-2 col create-new-btn btn btn-success').click()
        cy.get("[type='name']").type('huone123')
        //cy.get("[type='submit']").click()
        cy.get('.btn-success').contains('Lisää huone').click()
        cy.get('div').contains('huone123')

        //Create another room for testing
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('huone321')
        cy.get('.btn-success').contains('Lisää huone').click()

        //...And another one
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('huone555')
        cy.get('.btn-success').contains('Lisää huone').click()

    })
    it('cancels the room creation', () => {
        //Opens the creation container and removes it by clicking the cancel button
        cy.get('.create-new-btn').click()
        cy.get('.btn-secondary').contains('Peruuta').first().click()
    })
    it('checks that the rooms are in alphabetical order', () => {
        //Creates a room
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('huoneA')
        cy.get('.btn-success').contains('Lisää huone').click()

        //Another one
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('huoneB')
        cy.get('.btn-success').contains('Lisää huone').click()
        
        //And another one
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('huoneC')
        cy.get('.btn-success').contains('Lisää huone').click()
        cy.get('div').contains('huoneC')

        //Puts the list items into an array and compares it to an array that has
        //the list items in alphabetical order
        cy.get('.listitem').invoke('text').should('eq', ['huone123','huone321','huone555','huoneA','huoneB','huoneC'].join(''));
    })
    
    it('switches the active room', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'listitem').contains('huone123').click()
        cy.get('div').should('have.class', 'listitem active-listitem').contains('huone123')
    })
    it('deletes a room', () => {
        //Selects the room and clicks the trash icon to delete it
        cy.get('div').should('have.class', 'listitem').contains('huone123').click()
        cy.get('.trash:visible').click()
    })

})
// TODO: KIRJOITA TESTIT UUSIKSI

describe('item creation', function() {
    it('creates 2 items', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Esineet').click()
        cy.get('.create-new-btn').click()
        cy.get("[type='name']").should('have.class', 'form-control').first().type('esine123')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('esine123')  
    })
    it('cancels the item creation', () => {
        cy.get('.create-new-btn').click()
        cy.get("[type='button']").contains('Peruuta').click()   
    })
    it('removes the other item and displays the no items text', () => {
        cy.get('.listitem').contains('esine123').click()
        cy.get('.trash:visible').click()
        cy.get('div').contains('Ei esineitä! Luo uusi esine tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.')
    })
    it('creates a new item', () => {
        cy.get('.create-new-btn').click()
        cy.get("[type='name']").should('have.class', 'form-control').first().type('esine333')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('esine333')  
    })
    it('checks that the items are in alphabetical order', () => {
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('esineA')
        cy.get('.btn-success').contains('Lisää esine').click()

        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('esineB')
        cy.get('.btn-success').contains('Lisää esine').click()

        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('esineC')
        cy.get('.btn-success').contains('Lisää esine').click()

        cy.get('.listitem').invoke('text').should('eq',['esine333','esineA', 'esineB', 'esineC'].join(''));
    })

})
describe('inspector tests', function(){
    it('changes the name of a room in the inspector', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Huoneet').click()
        cy.get('div').should('have.class', 'listitem').contains('huone321').click()
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
        cy.get('div').should('have.class', 'listitem').contains('esine333').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('esine246')
        cy.get("[type='submit']").click()
        cy.get('div').contains('esine246') 
    })
    it('makes one of the room the starting room', () => {
        cy.get('.col-lg-2 > :nth-child(1) > .row > :nth-child(1)').click()
        cy.get('.listitem').contains('huone246').click()
        cy.get('#startRoom').click()
        cy.get('.item-edit-actions > .btn-success').click()
    })

})
describe('Furniture & play testing', function() {
    it('creates a furniture', () => {
        //cy.visit('https://kged-dev.netlify.com/')
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click()
        cy.get('.create-new-btn').click()
        cy.get("[type='name']").first().type('huonekalu123')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('huonekalu123')  
    })
    it('cancels a furniture creation', () => {
        //cy.visit('https://kged-dev.netlify.com')
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click()
        cy.get('.create-new-btn').click()
        cy.get("[type='name']").first().type('huonekalu321')
        cy.get("[type='button']").contains('Peruuta').first().click()
    })
    it('creates a furniture and deletes it', () => {
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click()
        cy.get('.create-new-btn').click()
        cy.get("[type='name']").first().type('huonekalu3')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('huonekalu3')
        cy.get('div').should('have.class', 'listitem').contains('huonekalu3').click()
        cy.get('.trash:visible').click()
    })
    it('edits the furniture name and gives it the room in the inspector', () => {
        cy.get('div').should('have.class', 'listitem').contains('huonekalu123').click()
        cy.get("[type='name']").clear()
        cy.get("[type='name']").type('huonekalu321')
        cy.get('.css-1hwfws3:visible').contains('Etsi huonetta...').click()
        cy.get('.css-1e5ysj4:visible').click()
    })
    it('adds the x and y attributes', () => {
        cy.get('input[name="attrs.x"]').clear()
        cy.get('input[name="attrs.x"]').type('200')
        cy.get('input[name = "attrs.y"]').clear()
        cy.get('input[name="attrs.y"]').type('200')
    })
    it('makes the furniture inspectable in game', () => {
        cy.get('input[name="isExaminable"]').click()
        cy.get('textarea').type('Wow I can inspect this')
    })
    it('makes the furniture a visible door and gives the room it leads to', () => {
        cy.get('input[name="attrs.visible"]').click()
        cy.get('input[name="isDoor"]').click()
        cy.get('.css-1hwfws3:visible').contains('Etsi huonetta...').click()
        //cy.get('.css-1e5ysj4:visible').contains('huone555').click()
    })
    it('saves the inspector edits', () => {
        cy.get('button[type="submit"]').click()
    })
    it('checks that the play and stop buttons activate and deactivate correctly', () =>{
    cy.get('.disabled').contains('Lopeta')
    cy.get('div').contains('Käynnistä').click()
    cy.get('.disabled').contains('Käynnistä')
    cy.get('div').contains('Lopeta').click()
    cy.get('.disabled').contains('Lopeta')
    })
    it('opens the interaction dialogue by clicking the furniture in game', () => {
        cy.get('div').contains('Käynnistä').click()
        /*cy.get(`.container > div`)
        .trigger('mousedown', { clientX: 200, clientY: 200 })*/
    })

})
//Alempi testattu ja toimii, kommentoitu pois jottei se lataisi tuota 
//zippiä joka kerta kun pyörittää testit
//Upload-testi vain painaa Tuontinappia
/*
describe('Download/Upload', function() {
    it('downloads a zip of the game', () => {
        cy.get('div').should('have.class', 'col').contains('Tallenna').click()
    })
    it('uploads a zip to the editor', () => {
        cy.get('div').should('have.class', 'col').contains('Lataa').click()
    })
})
*/