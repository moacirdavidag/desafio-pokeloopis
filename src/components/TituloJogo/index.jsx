import React from 'react';
import './style.css';

export const TituloJogo = ({ isJogando }) => {
  return (
    <header style={{ display: !isJogando ? 'block' : 'none' }}>
      <h1>PokeLoopis</h1>
    </header>
  )
}
