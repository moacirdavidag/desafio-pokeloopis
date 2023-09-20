import React from 'react';
import './style.css';
import { FaMusic } from "react-icons/fa";

export const MusicButton = ({ musicIsPlaying, onClick }) => {
    return (
        <button value={"Tocar música"}
            className={`botaoMusica ${musicIsPlaying ? 'ativo' : 'desligado'}`}
            onClick={onClick}>
            <FaMusic />
        </button>
    )
}
