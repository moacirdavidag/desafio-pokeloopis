import { useState, useEffect } from 'react';
import { Recorde } from './components/Recorde';
import { Pokemon } from './components/Pokemon';
import { Input } from './components/Input';
import { Dica } from './components/Dica';
import axios from 'axios';
import { BotaoJogar } from './components/BotaoJogar';


// async function GetNewPokemon() {
//   return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       if (this.status === 200) {
//         var data = JSON.parse(this.responseText);
//         if (data.sprites.front_default != null) {
//           resolve(data);
//         } else {
//           resolve(null);
//         }
//       } else {
//         reject("Erro ao buscar os dados do Pokémon.");
//       }
//     };

//     let id = GetNewId();
//     xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}/`, true);
//     xhr.send();
//   });
// }

// async function GetConvertedPokemon(){
//   let pokemon = await GetNewPokemon();
//   while(pokemon === null) pokemon = await GetNewPokemon();
//   let imageUrl = pokemon.sprites.other.home.front_default;
//   let name = pokemon.name;
//   let type = pokemon.types[0].type.name;//flavio disse que so precisava do primeiro tipo
//   return {
//     imageUrl,
//     name,
//     type
//   }
// }

function App() {
  const API_URL = "https://pokeapi.co/api/v2/pokemon";
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
  const [corDeFundoInput, setCorDeFundoInput] = useState("#bebebe");
  const [pokemonData, setPokemonData] = useState({
    imageUrl: null,
    type: null,
    name: null
  });

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

  useEffect(() => {
    const id = handleGetNewId();

    async function fetchPokemon() {
      await axios.get(`${API_URL}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            setPokemonData({
              imageUrl: data.sprites.other.home.front_default,
              name: data.name,
              type: data.types[0].type.name
            });
            console.log(data.name);
          }
        })

    }

    fetchPokemon();

  }, [jogando, acertouChute])

  const handleInputValue = (e) => {
    setPokemonChute(e);
  }

  const handleKeyUpInputEvent = (e) => {
    if (e.keyCode === 13 || e.code === "Enter") {
      if (pokemonChute.toLowerCase() === pokemonData.name.toLowerCase()) {
        setAcertouChute(true);
        setCorDeFundoInput("#18DF20");
        setPontuacao(pontuacao + 1);
      }
    }
  }

  // const toggleFindNewPokemon = () => {
  //   setFindNewPokemon(!findNewPokemon);
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await GetConvertedPokemon();
  //     setPokemonData(data);
  //     console.log(data);
  //   }
  //   fetchData();
  // }, [findNewPokemon]);

  const handlePlay = () => {
    setJogando(!jogando);
  }

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
