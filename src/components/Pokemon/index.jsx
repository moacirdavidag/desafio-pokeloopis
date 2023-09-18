import React from 'react';
import './style.css';

export const Pokemon = ({ urlImagem, isRevelado = false, corDeFundo }) => {
  return (
    <div className='circuloDica' style={{
      background: corDeFundo
    }}>
      <img src={urlImagem} className='imagemPokemon'
        style={{
          filter: `brightness(${isRevelado === true ? '100%' : '0%'})`,
        }}
      />
    </div>
  )
}
