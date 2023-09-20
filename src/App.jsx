import { useState, useEffect } from 'react';
import { Recorde } from './components/Recorde';
import { Pokemon } from './components/Pokemon';
import { Input } from './components/Input';
import { Dica } from './components/Dica';
import axios from 'axios';
import { BotaoJogar } from './components/BotaoJogar';
import { BotaoMusica } from './components/BotaoMusica';
import AMBIENT_SOUND_ARCHIVE from '/sounds/mixkit-ambient-game.mp3';
import { TituloJogo } from './components/TituloJogo';
import { salvarRecorde } from './services/data';
import { backgroundColors } from './constants/background-colors';
import { inputColors } from './constants/input-colors';
import { API_URL, DEFAULT_IMG_URL } from './constants/connection-urls';
import { Loading } from './components/Loading';

function App() {

  const [jogando, setJogando] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  const [pokemonChute, setPokemonChute] = useState('');
  const [acertouChute, setAcertouChute] = useState(false);
  const [corDeFundoInput, setCorDeFundoInput] = useState(inputColors.neutro);
  const [pokemonData, setPokemonData] = useState({
    imageUrl: null,
    type: null,
    name: null
  });
  const [next, setNext] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [ambientAudio, setAmbientAudio] = useState(new Audio(AMBIENT_SOUND_ARCHIVE));

  const handleGetNewId = () => {

    const range1 = [1, 1010];
    const range2 = [10001, 10270];

    let randomChoice = Math.random();

    if (randomChoice < 0.5) {
      randomChoice = Math.round(Math.random() * (range1[1] - range1[0]) + range1[0]);
    } else {
      randomChoice = Math.round(Math.random() * (range2[1] - range2[0]) + range2[0]);
    }

    return randomChoice;

  }

  const handleInputValue = (e) => {
    setPokemonChute(e);
  }

  const handleKeyUpInputEvent = (e) => {
    if (e.keyCode === 13 || e.code === "Enter") {
      if (pokemonChute.toLowerCase() === pokemonData.name.toLowerCase().replace(/-/g, " ") 
       || pokemonChute.toLowerCase() === pokemonData.name.toLowerCase()) {//nao precisa mais dos hifens
        handleSounds('acertou');
        setCorDeFundoInput(inputColors.certo);
        setPontuacao(pontuacao + 1);
        handleNext();
      } else {
        handleSounds('errou');
        setCorDeFundoInput(inputColors.errado);
        setPokemonChute(pokemonData.name.toLowerCase().replace(/-/g, " ")); // revela o nome do pokemon
        setTimeout(() => {
          handleGameOver();
        }, 3000);
      }
      setAcertouChute(true);
    }
  }

  const handleNext = () => {
    setTimeout(() => {
      setAcertouChute(false);
      setPokemonData(null);
      setPokemonChute("");
      setCorDeFundoInput(inputColors.neutro);
      setNext(!next);
    }, 1000);
  };

  const handlePlay = () => {
    setJogando(!jogando);
    setPokemonData(null);
    handleNext();
  }

  const handleGameOver = () => {
    salvarRecorde(pontuacao);
    setPontuacao(0);
    setPokemonChute("");
    setJogando(!jogando);
    //handleGameAmbientSound();estava desligando e ligando a musica sempre que perdia
  }

  const handleSounds = (opcao) => {
    const audioCorrect = new Audio('/sounds/mixkit-acertou.wav');
    const audioLose = new Audio('/sounds/mixkit-falhou.wav');

    if (opcao === 'acertou') {
      audioCorrect.play();
    }
    if (opcao === 'errou') {
      audioLose.play();
    }
  }

  const handleGameAmbientSound = () => {
    if (isMusicPlaying) {
      ambientAudio.pause();
      ambientAudio.currentTime = 0;
    } else {
      ambientAudio.play();
      ambientAudio.loop = true;
    }
    setIsMusicPlaying(!isMusicPlaying);
  }

  useEffect(() => {

    if (jogando) {
      const id = handleGetNewId();
      async function fetchPokemon() {
        await axios.get(`${API_URL}/${id}`)
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              setPokemonData({
                imageUrl: `${DEFAULT_IMG_URL}${id}.png`,
                name: data.name,
                type: data.types[0].type.name
              });
              console.log(data.name);
            }
          });
      };

      fetchPokemon();

    }

  }, [next]);

  return (
    <>
      <TituloJogo isJogando={jogando} />
      <BotaoJogar handlePlay={handlePlay} isJogando={jogando} />
      <BotaoMusica estado={isMusicPlaying} onClick={handleGameAmbientSound} isJogando={jogando} />
      {jogando &&
        <div className='container'>
          <Recorde atual={pontuacao} maximo={localStorage.getItem('recorde') || 0} />
          {pokemonData ? (
            <>
              <Pokemon urlImagem={pokemonData.imageUrl} isRevelado={acertouChute}
                corDeFundo={backgroundColors[pokemonData.type]} />
              <Input
                valueInput={pokemonChute}
                setInputValue={handleInputValue}
                keyDownEvent={handleKeyUpInputEvent}
                corDeFundo={corDeFundoInput}
              />
              <Dica tipo={pokemonData.type} corDeFundo={backgroundColors[pokemonData.type]} />
            </>
          ) : (
            <Loading />
          )}
        </div>
      }
    </>
  )
}

export default App;
