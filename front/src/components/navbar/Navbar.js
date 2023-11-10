import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <button to="/historico">Histórico</button>
      <button to="/ocorrencias">Ocorrências</button>
      <button to="/valores">Valores</button>
    </div>
  );
}

export default Navbar;