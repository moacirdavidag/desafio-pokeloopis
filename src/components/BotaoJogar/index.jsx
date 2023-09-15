import React from 'react';
import './style.css';

export const BotaoJogar = ({ handlePlay, isJogando }) => {
    return (
        <button className='jogarBtn' onClick={handlePlay}
            style={{ display: isJogando === false ? 'block' : 'none' }}>
            Jogar
        </button>
    )
}
