import React, { useContext } from 'react';
import { GameConfigButton } from './style';
import { FaMusic } from "react-icons/fa";
import { PlayingContext } from '../../../../context/PlayingContext';

export const ConfigMusicButton = () => {
    const { musicIsPlaying, toggleMusicPlaying } = useContext(PlayingContext);
    return (
        <>
            <GameConfigButton disabledStyle={musicIsPlaying}
                onClick={toggleMusicPlaying}>
                <FaMusic />
            </GameConfigButton>
        </>
    )
}
