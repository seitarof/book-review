import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Books from '../components/organisms/books/Books'
import CreateReview from '../components/pages/CreateReview'
import DetailReview from '../components/pages/DetailReview'
import EditReview from '../components/pages/EditReview'
import EditUser from '../components/pages/EditUser'
import Home from '../components/pages/Home'
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import { HeaderLayout } from '../components/template/HeaderLayout'

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <HeaderLayout>
            <Home />
          </HeaderLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <HeaderLayout>
            <EditUser />
          </HeaderLayout>
        }
      />
      <Route
        path="/new"
        element={
          <HeaderLayout>
            <CreateReview />
          </HeaderLayout>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <HeaderLayout>
            <DetailReview />
          </HeaderLayout>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <HeaderLayout>
            <EditReview />
          </HeaderLayout>
        }
      />
    </Routes>
  )
}

export default Router
