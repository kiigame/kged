describe('Furniture testing', function() {
    it('creates a furniture', () => {
        cy.visit('/');
        cy.createFurniture('huonekalu123');
        cy.get('div').contains('huonekalu123');
    });
    it('cancels a furniture creation', () => {
        cy.visit('/');
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click();
        cy.get('.create-new-btn').click();
        cy.get("[type='name']").first().type('huonekalu321');
        cy.get("[type='button']").contains('Peruuta').first().click();
        // TODO: Assert
    });
    it('creates a furniture and deletes it', () => {
        cy.visit('/');
        cy.createFurniture('huonekalu3');
        cy.get('div').should('have.class', 'listitem').contains('huonekalu3').click();
        cy.get('.trash:visible').click();
        // TODO: Assert
    });
    it('checks that the room selection in dropdown is cleared after cancelling editing', () => {
        cy.visit('/');
        cy.createFurniture('huonekalu123');
        cy.get('div').should('have.class', 'listitem').contains('huonekalu123').click();
        cy.get("[type='name']").clear();
        cy.get("[type='name']").type('huonekalu321');
        // Open room selector
        cy.get('.furniture-room-selector .css-tlfecz-indicatorContainer').click();
        // Click the menu item
        cy.get('.furniture-room-selector > :nth-child(2) > :nth-child(3)').click();
        cy.get('.ml-2').click();
        // Check that the room value is empty in the selector
        cy.get('.furniture-room-selector > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1)').should('be.empty');
    });
    it('edits the furniture name', () => {
        cy.visit('/');
        cy.createFurniture('huonekalu123');
        cy.get('div').should('have.class', 'listitem').contains('huonekalu123').click();
        cy.get("[type='name']").clear();
        cy.get("[type='name']").type('huonekalu321');
        // TODO: Assert
    });
    it('give furniture a room in the inspector', () => {
        cy.visit('/');
        cy.createRoom('huone555');
        cy.createFurniture('huonekalu123');
        cy.get('div').should('have.class', 'listitem').contains('huonekalu123').click();
        // Open room selector
        cy.get('.furniture-room-selector .css-tlfecz-indicatorContainer').click();
        // Click the menu item
        cy.get('.furniture-room-selector > :nth-child(2) > :nth-child(3)').contains('huone555').click();
        cy.get('.item-edit-actions > .btn-success').click();
        // Check that the furniture is found in the furniture list of the room
        cy.get('div').should('have.class', 'side-nav-item').contains('Huoneet').click();
        cy.get('.list-container').contains('huone555').click();
        cy.get('p').contains('huonekalu123');
    })
    it('adds the x and y attributes', () => {
        cy.visit('/');
        cy.createFurniture('huonekalu321');
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click();
        cy.get('div').should('have.class', 'listitem').contains('huonekalu321').click();
        cy.get('input[name="attrs.x"]').clear();
        cy.get('input[name="attrs.x"]').type('200');
        cy.get('input[name = "attrs.y"]').clear();
        cy.get('input[name="attrs.y"]').type('200');
        cy.get('button[type="submit"]').click();
        // TODO: Assert
    })
    it('makes the furniture inspectable in game', () => {
        cy.visit('/');
        cy.createFurniture('huonekalu321');
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click();
        cy.get('div').should('have.class', 'listitem').contains('huonekalu321').click();
        cy.get('input[name="isExaminable"]').click();
        cy.get('textarea').type('Wow I can inspect this');
        cy.get('button[type="submit"]').click();
        // TODO: Assert
    })
    it('makes the furniture a visible door and gives the room it leads to', () => {
        cy.visit('/');
        cy.createRoom('huone555');
        cy.createFurniture('huonekalu321');
        cy.get('div').should('have.class', 'side-nav-item').contains('Huonekalut').click();
        cy.get('div').should('have.class', 'listitem').contains('huonekalu321').click();
        cy.get('input[name="attrs.visible"]').click();
        cy.get('input[name="isDoor"]').click();
        // Click the room selector
        cy.get('.css-15ss2wu-SelectContainer').contains('Etsi huonetta...').click();
        // Click the menu item
        cy.get('.furniture-interactions > :nth-child(6) > :nth-child(3)').contains('huone555').click();
        cy.get('button[type="submit"]').click();
        // TODO: Assert
    });
});