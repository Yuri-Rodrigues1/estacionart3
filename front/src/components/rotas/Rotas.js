import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Rotas() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Login/>}></Route>
      <Route path='/cadastro' element ={<Cadastro/>}></Route> 
      <Route path='/inicio' element ={<Inicio/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default Rotas