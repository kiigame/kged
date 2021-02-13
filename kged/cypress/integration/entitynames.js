describe('Testing entity names', function() {
    it('checks that room and furniture cannot have same name', () => {
        cy.visit('/');
        cy.createRoom('huoneE');
        cy.createFurniture('huoneE');
        cy.get('div').contains('Nimi on jo käytössä');
    })
    it('checks that room and item cannot have same name', () => {
        cy.visit('/');
        cy.createRoom('huoneE');
        cy.createItem('huoneE');
        cy.get('div').contains('Nimi on jo käytössä')
    })
})