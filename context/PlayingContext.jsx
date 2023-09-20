import { createContext, useState } from "react";

import AMBIENT_MUSIC from '/sounds/mixkit-ambient-game.mp3';
import CORRECT_ANSWER_SOUND from '/sounds/mixkit-acertou.wav';
import WRONG_ANSWER_SOUND from '/sounds/mixkit-falhou.wav';

export const PlayingContext = createContext();

export const PlayingProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [points, setPoints] = useState(0);

    const [ambientMusic] = useState(new Audio(AMBIENT_MUSIC));
    const [correctAnswerAudio] = useState(new Audio(CORRECT_ANSWER_SOUND));
    const [wrongAnswerAudio] = useState(new Audio(WRONG_ANSWER_SOUND));

    const [musicIsPlaying, setMusicIsPlaying] = useState(false);

    const togglePlaying = () => {
        setIsPlaying(!isPlaying);
    }

    const handlePoints = (points) => {
        setPoints(points);
    }

    const toggleMusicPlaying = () => {
        if (!musicIsPlaying) {
            ambientMusic.play();
            ambientMusic.loop = true;
        } else {
            ambientMusic.pause();
            ambientMusic.currentTime = 0;
        }
        setMusicIsPlaying(!musicIsPlaying);
    }

    const handleGameAnswerSounds = (correct) => {
        return correct ? correctAnswerAudio.play() : wrongAnswerAudio.play();
    }

    return (
        <PlayingContext.Provider value={{
            isPlaying, togglePlaying,
            points, handlePoints,
            musicIsPlaying, toggleMusicPlaying,
            handleGameAnswerSounds
        }}>{children}</PlayingContext.Provider>
    )
}