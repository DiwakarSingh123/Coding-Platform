import React from 'react'
import { Routes,Route, Link } from 'react-router'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Singup from './Pages/Singup'
const App = () => {
  return (
    <>
    <nav>
      <Link to="/"></Link>
      <Link to="/singup"></Link>
      <Link to="/login"></Link>
    </nav>
    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/singup' element={<Singup />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
    </>
  )
}

export default App