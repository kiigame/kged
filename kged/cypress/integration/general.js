describe('general tests', function() {
    it('successfully loads', function() {
        cy.visit('/')
    })
    it('shows the play button as inactive and checks the error message', () => {
        //Checks that the "Käynnistä" button is disabled by default and
        //that it includes the error message that the game needs one starting room
        cy.get('.disabled').contains('Käynnistä')
        cy.get('[title="Pelillä täytyy olla yksi aloitushuone jotta se voidaan käynnistää! Aloitushuoneen voi asettaa valitulle huoneelle inspektorista."]')
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

describe('test play and stop buttons', function() {
    it('checks that the play and stop buttons activate and deactivate correctly', () =>{
        cy.visit('/');
        cy.createStartingRoom('123');
        cy.get('.disabled').contains('Lopeta');
        cy.get('div').contains('Käynnistä').click();
        cy.get('.disabled').contains('Käynnistä');
        cy.get('.pre-controls > :nth-child(2)').contains('Lopeta').click();
        cy.get('.disabled').contains('Lopeta');
    });
});