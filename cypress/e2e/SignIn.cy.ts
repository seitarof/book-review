/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })
  it('email test', () => {
    cy.get('#email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')

    cy.get('#submit').click()

    // assert(Cypress.$('#email-err').length == 0)
    cy.get('#email-err').then(e => {
      console.log(e);
    })

    cy.get('#email')
      .clear()
      .should('have.value', '')

      .type('fakeemail.com')
      .should('have.value', 'fakeemail.com')

    cy.get('#submit').click()

    cy.get('#email-err').should(
      'have.text',
      '入力形式がメールアドレスではありません。'
    )
  })
})
