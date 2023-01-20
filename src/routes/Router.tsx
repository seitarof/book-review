import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default Router
