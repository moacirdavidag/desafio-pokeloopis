import React, { useState } from 'react';

import { Record } from './components/Record';
import { Pokemon } from './components/Pokemon';
import { Input } from './components/Input';
import { Tip } from './components/Tip';
import { Loading } from './components/Loading';

import { useContext } from 'react';
import { PlayingContext } from '../../context/PlayingContext';
import { comparePokemonName } from '../../utils/comparePokemonName';
import {saveRecord } from '../../services/recorde';

import { useFetchPokemon } from '../../hooks/useFetchPokemon';
import { backgroundColors } from '../../constants/background-colors';
import { inputColors } from '../../constants/input-colors';

export const Game = () => {

    const [next, setNext] = useState(false);
    const [questionIsRight, setQuestionIsRight] = useState(false);

    const { points, handlePoints, isPlaying, togglePlaying, handleGameAnswerSounds } = useContext(PlayingContext);
    const [pokemon, isLoading] = useFetchPokemon(next, isPlaying);

    const [inputValue, setInputValue] = useState("");
    const [inputColor, setInputColor] = useState(inputColors.neutro);

    const handleInputValue = (e) => {
        setInputValue(e);
    }


    const handleKeyEvent = (e) => {
        if (e.code === "Enter") {
            handleAnswer();
        }
    }

    const handleAnswer = async () => {
        if (comparePokemonName(inputValue, pokemon.name)) {
            handleGameAnswerSounds(true);
            setQuestionIsRight(true);
            setInputColor(inputColors.certo);
            handlePoints(points + 1);
            setTimeout(() => {
                setInputValue("");
                setInputColor(inputColors.neutro);
                setQuestionIsRight(false);
                setNext(!next);
            }, 1000);
        } else {
            handleGameAnswerSounds(false);
            setQuestionIsRight(true);
            setInputValue(pokemon.name);
            setInputColor(inputColors.errado);
            saveRecord(points);
            handlePoints(0);
            setTimeout(() => {
                setQuestionIsRight(false);
                togglePlaying();
            }, 3000)
        }
    }

    return (
        <>
            {isLoading ? <Loading /> :
                <div className='container'>
                    <Record current={points} max={localStorage.getItem('recorde') ? localStorage.getItem('recorde') : 0} />
                    <Pokemon
                        image={pokemon.image}
                        isShowing={questionIsRight}
                        background={backgroundColors[pokemon.type]}
                    />
                    <Input valueInput={inputValue} setInputValue={handleInputValue}
                        background={inputColor} keyDownEvent={handleKeyEvent} />
                    <Tip tip={pokemon.type} background={backgroundColors[pokemon.type]} />
                </div>
            }

        </>
    )
}
