import React from 'react';
import './style.css';

export const GameTitle = ({ isJogando }) => {
  return (
    <header style={{ display: !isJogando ? 'block' : 'none' }}>
      <h1>PokeLoopis</h1>
    </header>
  )
}
