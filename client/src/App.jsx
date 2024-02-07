import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import PrivateRout from './components/PrivateRout'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'


export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/About' element ={<About />} />
        <Route path='/sign-in' element ={<SignIn />} />
        <Route path='/sign-up' element ={<SignUp />} />
        <Route path='/listing/:listingId' element ={<Listing />} />
        <Route path='/search' element = {<Search />} />
        <Route element={<PrivateRout />}>
          <Route path='/Profile' element ={<Profile />} />
          <Route path='/create-listing' element ={<CreateListing />} />
          <Route path='/update-listing/:listingId' element ={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
