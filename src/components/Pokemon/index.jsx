import React from 'react';
import './style.css';

export const Pokemon = ({urlImagem, isRevelado = false}) => {
  return (
    <div className='circuloDica'>
        <img src={urlImagem} className='imagemPokemon' 
        style={{filter: `brightness(${isRevelado === true ? '100%' : '0%'})`}}
        />
    </div>
  )
}
