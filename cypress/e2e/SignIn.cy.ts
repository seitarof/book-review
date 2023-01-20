/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/login')
  })
  it('email test', () => {
    cy.get('#email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')

      .clear()
      .should('have.value', '')

      .type('fakeemail.com')
      .should('have.value', 'fakeemail.com')

    cy.get('#submit').click()

    cy.get('#email-err')
      .should('have.text', '入力形式がメールアドレスではありません。')
  });
})