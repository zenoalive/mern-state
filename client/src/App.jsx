import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import PrivateRout from './components/PrivateRout'


export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/About' element ={<About />} />
        <Route element={<PrivateRout />}>
          <Route path='/Profile' element ={<Profile />} />
        </Route>
       
        <Route path='/sign-in' element ={<SignIn />} />
        <Route path='/sign-up' element ={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
