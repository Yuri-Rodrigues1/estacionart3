import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../inicio/Inicio'
import Login from '../login/Login'
import Cadastro from '../login/Cadastro'
import Ocorrencias from '../ocorrencias/Ocorrencias'

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/ocorrencias' element={<Ocorrencias />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Rotas