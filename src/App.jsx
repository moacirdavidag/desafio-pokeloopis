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


function App() {
  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  const DEFAULT_IMG_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
  const CORES_FUNDO = {
    certo: "#18DF20",
    errado: "#ff0000",
    neutro: "#bebebe"
  };

  const [partida, setPartida] = useState({
    jogando: false,
    pontuacao: 0,
    pokemonChute: null,
    acertouChute: null
  })
  const [jogando, setJogando] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  const [pokemonChute, setPokemonChute] = useState('');
  const [acertouChute, setAcertouChute] = useState(false);
  const [corDeFundoInput, setCorDeFundoInput] = useState(CORES_FUNDO.neutro);
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
      if (pokemonChute.toLowerCase() === pokemonData.name.toLowerCase().replace(/-/g, " ")) {//nao precisa mais dos hifens
        handleSounds('acertou');
        //setAcertouChute(true);
        setCorDeFundoInput(CORES_FUNDO.certo);
        setPontuacao(pontuacao + 1);
        handleNext();
      } else {
        handleSounds('errou');
        setCorDeFundoInput(CORES_FUNDO.errado);
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
      setCorDeFundoInput(CORES_FUNDO.neutro);
      setNext(!next);
    }, 1000);
  };

  const handlePlay = () => {
    console.log(jogando);
    setJogando(!jogando);
    setPokemonData(null);
    console.log(jogando);
    handleNext();
  }

  const handleGameOver = () => {
    salvarRecorde(pontuacao);
    setPontuacao(0);
    setPokemonChute("");
    setJogando(!jogando);
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
                //imageUrl: data.sprites.other.home.front_default,//as vezes o pokemon não possui esse sprite
                imageUrl: `${DEFAULT_IMG_URL}${id}.png`,
                name: data.name,
                type: data.types[0].type.name
              });
              /*if (!data.sprites.other.home.front_default) {
                setPokemonData((prevState) => ({
                  ...prevState,
                  imageUrl: data.sprites.home_default,
                }));
              }*/
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
          <Recorde atual={pontuacao} maximo={localStorage.getItem('recorde')} />
          {pokemonData ? (
            <>
              <Pokemon urlImagem={pokemonData.imageUrl} isRevelado={acertouChute} />
              <Input
                valueInput={pokemonChute}
                setInputValue={handleInputValue}
                keyDownEvent={handleKeyUpInputEvent}
                corDeFundo={corDeFundoInput}
              />
              <Dica tipo={pokemonData.type} />
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      }
    </>
  )
}

export default App;
