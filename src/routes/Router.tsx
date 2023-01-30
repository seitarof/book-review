import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Books from '../components/organisms/books/Books'
import Home from '../components/pages/Home'
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import { HeaderLayout } from '../components/template/HeaderLayout'

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={
        <HeaderLayout>
          <Home />
        </HeaderLayout>
      } />
    </Routes>
  )
}

export default Router
