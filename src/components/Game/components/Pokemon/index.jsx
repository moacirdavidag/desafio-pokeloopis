import React from 'react';
import './style.css';

export const Pokemon = ({ image, isShowing = false, background }) => {
  return (
    <div className='circuloDica' style={{
      background: background
    }}>
      <img src={image} className='imagemPokemon'
        style={{
          filter: `brightness(${isShowing === true ? '100%' : '0%'})`,
        }}
      />
    </div>
  )
}
