import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../inicio/Inicio'
import Login from '../login/Login'
import Cadastro from '../login/Cadastro'

function Rotas() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Login/>}></Route>
      <Route path='/inicio' element ={<Inicio/>}></Route>
      <Route path='/cadastro' element ={<Cadastro/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default Rotas