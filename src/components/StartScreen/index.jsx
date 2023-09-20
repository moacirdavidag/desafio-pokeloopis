import React, { useContext } from 'react';
import { GameTitle } from './components/GameTitle';
import { PlayButton } from './components/PlayButton';
import { MusicButton } from './components/MusicButton';
import { PlayingContext } from '../../../context/PlayingContext';

export const StartScreen = () => {
    const { togglePlaying, musicIsPlaying, toggleMusicPlaying } = useContext(PlayingContext);

    return (
        <div className='container'>
            <GameTitle />
            <PlayButton handlePlay={togglePlaying} />
            <MusicButton musicIsPlaying={musicIsPlaying} onClick={toggleMusicPlaying} />
        </div>
    )
}
