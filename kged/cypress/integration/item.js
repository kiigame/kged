describe('item creation', function() {
    it('creates a new item', () => {
        cy.visit('/');
        cy.createItem('esine123');
        cy.get('div').contains('esine123')  ;
    });
    it('cancels the item creation', () => {
        cy.visit('/')
        cy.get('.tab-list-item').contains('Esineet').click();
        cy.get('.create-new-btn').click();
        cy.get("[type='button']").contains('Peruuta').click();
        // TODO: Assert
    });
    it('removes the other item and displays the no items text', () => {
        cy.visit('/');
        cy.createItem('esine123');
        cy.get('.listitem').contains('esine123').click();
        cy.get('.trash:visible').click();
        cy.get('div').contains('Ei esineitä! Luo uusi esine tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.');
    });
    it('checks that the items are in alphabetical order', () => {
        cy.visit('/')
        cy.createItem('esine333');
        cy.createItem('esineA');
        cy.createItem('esineB');
        cy.createItem('123e');
        cy.createItem('456e');
        cy.createItem('EsineD');
        cy.createItem('esineC');

        let order = ['123e', '456e', 'esine333','esineA', 'esineB', 'esineC', 'EsineD'];
        cy.get('.listitem').each((_, index) => {
            cy.contains(order[index])
        });
    });
});

describe('inspector tests', function() {
    it('changes the name of an item in the inspector', () => {
        cy.visit('/');
        cy.createItem('esine333');
        cy.get('div').should('have.class', 'tab-list-item col side-nav-item').contains('Esineet').click();
        cy.get('div').should('have.class', 'listitem').contains('esine333').click();
        cy.get("[type='name'").clear();
        cy.get("[type='name'").type('esine246');
        cy.get("[type='submit']").click();
        cy.get('div').contains('esine246');
    });
});