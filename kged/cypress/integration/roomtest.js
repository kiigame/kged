describe('room creation', function() {
    it('successfully loads', function() {
        cy.visit('/')
    })
    it('shows the play button as inactive and checks the error message', () => {
        //Checks that the "Käynnistä" button is disabled by default and
        //that it includes the error message that the game needs one starting room
        cy.get('.disabled').contains('Käynnistä')
        cy.get('[title="Pelillä täytyy olla yksi aloitushuone jotta se voidaan käynnistää! Aloitushuoneen voi asettaa valitulle huoneelle inspektorista."]')
    })
    it('successfully opens the room creation container', () => {
        //Open the room creation by selecting the creation button that opens the container
        cy.get('.create-new-btn').click()    
    })
    it('gives the room a name and creates it', () => {
        //In the creation container the test inputs the name for the room
        cy.get("[type='name']").type('huone123')
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
        //Opens the creation container and hides it by clicking the cancel button
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

        //Another one
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('123')
        cy.get('.btn-success').contains('Lisää huone').click()

        //Another one
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('234')
        cy.get('.btn-success').contains('Lisää huone').click()

        //Another one
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('HuoneD')
        cy.get('.btn-success').contains('Lisää huone').click()
        
        //And another one
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('huoneC')
        cy.get('.btn-success').contains('Lisää huone').click()
        cy.get('div').contains('huoneC')

        //Puts the list items into an array and compares it to an array that has
        //the list items in alphabetical order
        let order = ['123', '234', 'huone123','huone321','huone555','huoneA','huoneB','huoneC', 'HuoneD']
        cy.get('.listitem').each((_, index) => {
            cy.contains(order[index])
        })
    })
    it('switches the active room', () => {
        //Clicks another room on the list, making it the active one and opening the inspector for it
        cy.get('div').should('have.class', 'listitem').contains('huone123').click()
        cy.get('div').should('have.class', 'listitem active-listitem').contains('huone123')
    })
    it("Checks that there aren't any furnitures in the room.", () => {
        cy.get('p').contains('Huoneessa ei ole yhtään huonekalua.')
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
        //Same method as with the room creation but selects the item tab in the beginning
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
        cy.get('input[name="name"]').type('123e')
        cy.get('.btn-success').contains('Lisää esine').click()

        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('456e')
        cy.get('.btn-success').contains('Lisää esine').click()

        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('EsineD')
        cy.get('.btn-success').contains('Lisää esine').click()

        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('esineC')
        cy.get('.btn-success').contains('Lisää esine').click()

        let order = ['123e', '456e', 'esine333','esineA', 'esineB', 'esineC', 'EsineD']
        cy.get('.listitem').each((_, index) => {
            cy.contains(order[index])
        })
    })
})

describe('inspector tests', function(){
    it('changes the name of a room in the inspector', () => {
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Huoneet').click()
        cy.get('div').should('have.class', 'listitem').contains('huone321').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('huone246')
        cy.get("[type='submit']").click()
        cy.get('div').contains('huone246')
    })
    it('cancels the edit of the room in inspector', () => {
        cy.get('div').should('have.class', 'listitem').contains('huone246').click()
        cy.get("[type='name'").clear()
        cy.get("[type='name'").type('huone123')
        cy.get("[type='button']").contains('Peruuta').click()
        cy.get('div').should('have.class', 'listitem').contains('huone246')
    })
    it('changes the name of an item in the inspector', () => {
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

describe('Name change tests', function() {
    it('Initial game name is set to Kiigame', function() {
        cy.get('.game-name').should('have.value', 'Kiigame')
    })
    it('Checks that the name of the game cannot be empty', () => {
        const stub = cy.stub()
        cy.get('.game-name').clear()
        cy.on('window:alert', stub)
        cy.get('div').contains('Tallenna').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Pelin nimi ei voi olla tyhjä!')      
          })
    })
    it('changes the name of the game', () => {
        cy.get('.game-name').clear().type('pelinimi')
        cy.get('.game-name').should('have.value', 'pelinimi')
    })
})

describe('Testing entity names', function() {
    it('checks that room and furniture cannot have same name', () => {
        cy.get('.create-new-btn').click()
        cy.get('input[name="name"]').type('huoneE')
        cy.get('.btn-success').contains('Lisää huone').click()
        cy.get('div').contains('huoneE')

        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click()
        cy.get('.create-new-btn').click()
        cy.get("[type='name']").first().type('huoneE')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('Nimi on jo käytössä')
    })
    it('checks that room and item cannot have same name', () => {
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Esineet').click()
        cy.get('.create-new-btn').click()
        cy.get("[type='name']").first().type('huoneE')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('Nimi on jo käytössä')
    })
})

describe('Character testing', function() {
    it('checks that character frames exist', () => {
        cy.get('div').should('have.class', 'side-nav-item').contains('Päähahmo').click()
        cy.get('div').contains('Idle1')
        cy.get('div').contains('Idle2')
        cy.get('div').contains('Puhe1')
        cy.get('div').contains('Puhe2')
    })
})

describe('Furniture & play testing', function() {
    it('creates a furniture', () => {
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click()
        cy.get('.create-new-btn').click()
        cy.get("[type='name']").first().type('huonekalu123')
        cy.get("[type='submit']").first().click()
        cy.get('div').contains('huonekalu123')  
    })
    it('cancels a furniture creation', () => {
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
    it('checks that the room selection in dropdown is cleared after cancelling editing', () => {
        cy.get('div').should('have.class', 'listitem').contains('huonekalu123').click()
        cy.get("[type='name']").clear()
        cy.get("[type='name']").type('huonekalu321')
        // Open room selector
        cy.get('.furniture-room-selector .css-tlfecz-indicatorContainer').click()
        // Click the menu item
        cy.get('.furniture-room-selector > :nth-child(2) > :nth-child(3)').click()
        cy.get('.ml-2').click()
        // Check that the room value is empty in the selector
        cy.get('.furniture-room-selector > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1)').should('be.empty')
    })
    it('edits the furniture name and gives it the room in the inspector', () => {
        cy.get('div').should('have.class', 'listitem').contains('huonekalu123').click()
        cy.get("[type='name']").clear()
        cy.get("[type='name']").type('huonekalu321')
        // Open room selector
        cy.get('.furniture-room-selector .css-tlfecz-indicatorContainer').click()
        // Click the menu item
        cy.get('.furniture-room-selector > :nth-child(2) > :nth-child(3)').contains('huone555').click()
        cy.get('.item-edit-actions > .btn-success').click()
    })
    it('Checks that the furniture is listed in the room', () => {
        cy.get('div').should('have.class', 'side-nav-item').contains('Huoneet').click()
        cy.get('.list-container').contains('huone555').click()
        cy.get('p').contains('huonekalu321')
    })
    it('adds the x and y attributes', () => {
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click()
        cy.get('div').should('have.class', 'listitem').contains('huonekalu321').click()
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
        // Click the room selector
        cy.get('.css-15ss2wu-SelectContainer').contains('Etsi huonetta...').click()
        // Click the menu item
        cy.get('.furniture-interactions > :nth-child(6) > :nth-child(3)').contains('huone555').click()
    })
    it('saves the inspector edits', () => {
        cy.get('button[type="submit"]').click()
    })
    it('checks that the play and stop buttons activate and deactivate correctly', () =>{
        cy.get('.disabled').contains('Lopeta')
        cy.get('div').contains('Käynnistä').click()
        cy.get('.disabled').contains('Käynnistä')
        cy.get('.pre-controls > :nth-child(2)').contains('Lopeta').click()
        cy.get('.disabled').contains('Lopeta')
    })
})

describe('Manual button testing', function() {
    it('checks that clicking the manual button opens with the right url', () => {
        cy.visit('http://localhost:3000')
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen')
        })

        cy.get('div').contains('Ohjeet').click()
        cy.get('@windowOpen').should('be.calledWith', 'https://github.com/kiigame/kged/wiki/Pikaopas')
        
    })
})
