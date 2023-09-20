import React from 'react';
import './style.css';

export const Tip = ({tip, background}) => {
  return (
    <div className='dica' style={{background}}>
        Tipo: {tip}
    </div>
  )
}
