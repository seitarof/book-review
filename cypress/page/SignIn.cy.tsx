import React from 'react'
import SignIn from '../../src/components/pages/SignIn'
import { BrowserRouter } from 'react-router-dom'

describe('<SignIn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )
    cy.get('#email').type('pyotarou@gmail.com')
    cy.get('#password').type('hogehoge')
  })
})
