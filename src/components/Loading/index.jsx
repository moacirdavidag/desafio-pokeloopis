import React from 'react';
import './style.css';
import pokeball from '../../assets/images/pokeball.png';

export const Loading = () => {
  return (
    <div className='container'>
        <img src={pokeball} alt="Pokeball" className='pokeball-loading' />
        <div className='dot-animation'>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    </div>
  )
}
