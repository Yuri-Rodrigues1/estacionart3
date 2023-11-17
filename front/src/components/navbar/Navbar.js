import React from 'react';
import './Navbar.css';

const Navbar = () => {

  const abrirAlert  = () =>{
    alert('sou um alert')
  }

  return (
    <div className="navbar">
      <button to="/historico" onClick={abrirAlert}>Histórico</button>
      <button to="/ocorrencias">Ocorrências</button>
      <button to="/valores">Valores</button>
    </div>
  );
}

export default Navbar;