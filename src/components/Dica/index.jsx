import React from 'react';
import './style.css';

export const Dica = ({tipo, corDeFundo}) => {
  return (
    <div className='dica' style={{background: corDeFundo}}>
        Tipo: {tipo}
    </div>
  )
}
