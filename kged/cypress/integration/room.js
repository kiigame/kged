describe('room creation', function() {
    it('successfully opens the room creation container', () => {
        // Open the room creation by selecting the creation button that opens the container
        cy.visit('/');
        cy.get('.tab-list-item').contains('Huoneet').click()
        cy.get('.create-new-btn').click()
        // TODO: Assert
    });
    it('gives the room a name and creates it', () => {
        cy.visit('/')
        // In the creation container the test inputs the name for the room
        cy.createRoom('huone123');
        cy.get('div').contains('huone123');
    });
    it('cancels the room creation', () => {
        cy.visit('/')
        // Opens the creation container and hides it by clicking the cancel button
        cy.get('.tab-list-item').contains('Huoneet').click()
        cy.get('.create-new-btn').click()
        cy.get('.btn-secondary').contains('Peruuta').first().click();
        // TODO: Assert
    });
    it('checks that the rooms are in alphabetical order', () => {
        cy.visit('/')
        cy.createRoom('huoneA');
        cy.createRoom('huoneB');
        cy.createRoom('123');
        cy.createRoom('huone123');
        cy.createRoom('huone321');
        cy.createRoom('234');
        cy.createRoom('HuoneD');
        cy.createRoom('huoneC');

        // Puts the list items into an array and compares it to an array that has
        // the list items in alphabetical order
        let order = ['123', '234', 'huone123', 'huone321', 'huoneA', 'huoneB', 'huoneC', 'HuoneD'];
        cy.get('.listitem').each((_, index) => {
            cy.contains(order[index]);
        });
    });
    it('switches the active room', () => {
        cy.visit('/');
        // Clicks another room on the list, making it the active one and opening the inspector for it
        cy.createRoom('huone123');
        cy.get('div').should('have.class', 'listitem').contains('huone123').click();
        cy.get('div').should('have.class', 'listitem active-listitem').contains('huone123');
    });
    it("Checks that there aren't any furnitures in the room.", () => {
        cy.visit('/');
        cy.createRoom('huone123');
        cy.get('div').contains('huone123').click();
        cy.get('p').contains('Huoneessa ei ole yhtään huonekalua.');
    });
    it('deletes a room', () => {
        cy.visit('/');
        cy.createRoom('huone123');
        // Selects the room and clicks the trash icon to delete it
        cy.get('div').contains('huone123').click();
        cy.get('.trash:visible').click();
        // TODO: Assert
    });
});

describe('inspector tests', function() {
    it('changes the name of a room in the inspector', () => {
        cy.visit('/');
        cy.createRoom('huone321');
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Huoneet').click();
        cy.get('div').should('have.class', 'listitem').contains('huone321').click();
        cy.get("[type='name'").clear();
        cy.get("[type='name'").type('huone246');
        cy.get("[type='submit']").click();
        cy.get('div').contains('huone246');
    });
    it('cancels the edit of the room in inspector', () => {
        cy.visit('/')
        cy.createRoom('huone246');
        cy.get('div').should('have.class', 'listitem').contains('huone246').click();
        cy.get("[type='name'").clear();
        cy.get("[type='name'").type('huone123');
        cy.get("[type='button']").contains('Peruuta').click();
        cy.get('div').should('have.class', 'listitem').contains('huone246');
    });
    it('create a starting room', () => {
        cy.visit('/');
        cy.createStartingRoom('huone246');
        // TODO: Assert
    });
});