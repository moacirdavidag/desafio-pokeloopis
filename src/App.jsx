import { useState, useEffect } from 'react';
import { Recorde } from './components/Recorde';
import { Pokemon } from './components/Pokemon';
import { Input } from './components/Input';
import { Dica } from './components/Dica';
import axios from 'axios';
import { BotaoJogar } from './components/BotaoJogar';


function App() {
  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  const CORES_FUNDO = {
    certo : "#18DF20",
    errado : "#ff0000",
    neutro :"#bebebe"
  };
  const INITIAL_LIFE = 2;

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
  const [lifePoints, setLifePoints] = useState(INITIAL_LIFE);

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
        setAcertouChute(true);
        setCorDeFundoInput(CORES_FUNDO.certo);
        setPontuacao(pontuacao + 1);
        handleNext();
      }else{
        setCorDeFundoInput(CORES_FUNDO.errado);
        handleLifePoints();
      }
    }
  }

  const handleNext = () => {
    setTimeout(()=>{
      setAcertouChute(false);
      setPokemonData(null);
      setPokemonChute("");
      setCorDeFundoInput(CORES_FUNDO.neutro);
      setNext(!next);
    }, 1000);
  };
  
  const handlePlay = () => {
    setJogando(!jogando);
    setPokemonData(null);
    handleNext();
  }

  const handleGameOver = () => {
    setLifePoints(INITIAL_LIFE);
    handlePlay();
    //o que acontece quando erra e perde
  }
  const handleLifePoints = () => {
    setLifePoints(lifePoints-1);
    //console.log(lifePoints);
    if(lifePoints <= 0) handleGameOver();
  }
  
  useEffect(() => {
    const id = handleGetNewId();

    async function fetchPokemon() {
      await axios.get(`${API_URL}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            setPokemonData({
              imageUrl: data.sprites.other.home.front_default,//as vezes o pokemon não possui esse sprite
              name: data.name,
              type: data.types[0].type.name
            });
            console.log(data.name);
          }
        });
    };
    
    fetchPokemon();

  }, [next]);
  
      return (
        <>
      <BotaoJogar handlePlay={handlePlay} isJogando={jogando} />
      {jogando &&
        <div className='container'>
          <Recorde atual={pontuacao} maximo={0} />
          {pokemonData ? (
            <>
              <Pokemon urlImagem={pokemonData.imageUrl} isRevelado={acertouChute} />
              <Input
                valueInput={pokemonChute}
                setInputValue={handleInputValue}
                keyUpEvent={handleKeyUpInputEvent}
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
