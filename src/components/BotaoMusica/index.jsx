import React from 'react';
import './style.css';
import { FaMusic } from "react-icons/fa";

export const BotaoMusica = ({ estado, onClick, isJogando }) => {
    return (
        <button value={"Tocar música"}
        className={`botaoMusica ${estado ? 'ativo' : 'desligado'}`}
        onClick={onClick}
        style={{display: !isJogando ? 'block' : 'none'}}>
            <FaMusic />
        </button>
    )
}
