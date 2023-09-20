import React from 'react';
import './style.css';

export const Record = ({ current, max }) => {
    return (
        <>
            <div className='recordeComponent'>
                <span className='spanPontuacaoAtual'>Acertos atuais: {current}</span>
                <span className='spanPontuacaoRecorde'>Recorde de acertos: {max}</span>
            </div>
        </>
    )
}
