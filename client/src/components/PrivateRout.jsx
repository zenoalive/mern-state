
import React from 'react'
import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRout() {

    const {currentUser} = useSelector((state) => state.user)
  return currentUser ? <Outlet></Outlet> : <Navigate to='sign-in' />
}
