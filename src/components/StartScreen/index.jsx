import React, { useContext, useEffect, useState } from 'react';
import { GameTitle } from './components/GameTitle';
import { PlayButton } from './components/PlayButton';
import { MusicButton } from './components/MusicButton';
import { PlayingContext } from '../../context/PlayingContext';
import { pokemonCuriosities } from '../../others/pokemonCuriosities';
import { Curiosity } from './components/Curiosity';

export const StartScreen = () => {
    const { togglePlaying, musicIsPlaying, toggleMusicPlaying } = useContext(PlayingContext);
    const [curiosity, setCuriosity] = useState(pokemonCuriosities[0]);

    const handleCuriosity = () => {
        setTimeout(() => {
            const index = Math.floor(Math.random() * pokemonCuriosities.length);
            setCuriosity(pokemonCuriosities[index]);
            return index;
        }, 5000)
    }

    useEffect(() => {
        handleCuriosity();
    }, [curiosity])

    return (
        <div className='center'>
            <GameTitle />
            <Curiosity curiosity={curiosity} />
            <PlayButton handlePlay={togglePlaying} />
            <MusicButton musicIsPlaying={musicIsPlaying} onClick={toggleMusicPlaying} />
        </div>
    )
}
