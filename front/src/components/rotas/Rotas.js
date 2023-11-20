import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../inicio/Inicio'
import Login from '../login/Login'
import Cadastro from '../login/Cadastro'
import Ocorrencias from '../ocorrencias/Ocorrencias'
import Historico from '../historico/Historico'

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/ocorrencias' element={<Ocorrencias />} />
        <Route path='/historico' element={<Historico/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Rotas