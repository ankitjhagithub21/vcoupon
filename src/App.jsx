import React from 'react'
import "./App.css"
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import {Toaster} from "react-hot-toast"
import { useSelector } from 'react-redux'
const App = () => {
const {user} = useSelector((state)=>state.auth)

  return (
 <>

 <Toaster/>
 {
  user ? <Dashboard/> : <LoginPage/>
 }
 
 
 
 </>
  )
}

export default App
