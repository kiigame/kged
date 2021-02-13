describe('Character testing', function() {
    it('checks that character frames exist', () => {
        cy.visit('/');
        cy.get('div').should('have.class', 'side-nav-item').contains('Päähahmo').click();
        cy.get('div').contains('Idle1');
        cy.get('div').contains('Idle2');
        cy.get('div').contains('Puhe1');
        cy.get('div').contains('Puhe2');
    });
});