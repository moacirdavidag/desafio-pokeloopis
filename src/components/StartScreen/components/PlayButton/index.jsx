import React from 'react';
import './style.css';

export const PlayButton = ({ handlePlay }) => {
    return (
        <button className='jogarBtn'
            onClick={handlePlay}>
            Jogar
        </button>
    )
}
