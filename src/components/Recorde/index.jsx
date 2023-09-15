import React from 'react';
import './style.css';

export const Recorde = ({ atual, maximo }) => {
    return (
        <>
            <div className='recordeComponent'>
                <span className='spanPontuacaoAtual'>Acertos atuais: {atual}</span>
                <span className='spanPontuacaoRecorde'>Recorde de acertos: {maximo}</span>
            </div>
        </>
    )
}
