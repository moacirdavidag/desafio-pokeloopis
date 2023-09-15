import { useState, useEffect } from 'react';
import { Recorde } from './components/Recorde';
import { Pokemon } from './components/Pokemon';
import { Input } from './components/Input';
import { Dica } from './components/Dica';

function GetNewId(){
  const range1 = [1,1010];
  const range2 = [10001, 10270];
  
  const randomChoice = Math.random();

  if (randomChoice < 0.5) {
    return Math.round(Math.random() * (range1[1] - range1[0]) + range1[0]);
  } else {
    return Math.round(Math.random() * (range2[1] - range2[0]) + range2[0]);
  }
}

async function GetNewPokemon() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        if (data.sprites.front_default != null) {
          resolve(data);
        } else {
          resolve(null);
        }
      } else {
        reject("Erro ao buscar os dados do Pokémon.");
      }
    };

    let id = GetNewId();
    xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}/`, true);
    xhr.send();
  });
}

async function GetConvertedPokemon(){
  let pokemon = await GetNewPokemon();
  while(pokemon === null) pokemon = await GetNewPokemon();
  let imageUrl = pokemon.sprites.front_default;
  let name = pokemon.name;
  let type = pokemon.types[0].type.name;//flavio disse que so precisava do primeiro tipo
  return {
    imageUrl,
    name,
    type
  }
}

function App() {

  const [jogando, setJogando] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  const [pokemonChute, setPokemonChute] = useState('');
  const [acertouChute, setAcertouChute] = useState(true);
  const [corDeFundoInput, setCorDeFundoInput] = useState("#bebebe");
  const [pokemonData, setPokemonData] = useState(null);
  const [findNewPokemon, setFindNewPokemon] = useState(false);

  const handleInputValue = (e) => {
    setPokemonChute(e);
  }

  const handleKeyUpInputEvent = (e) => {
    if(e.keyCode === 13 || e.code === "Enter") {
      setCorDeFundoInput("#18DF20");
    }
  }

  const toggleFindNewPokemon = () => {
    setFindNewPokemon(!findNewPokemon);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await GetConvertedPokemon();
      setPokemonData(data);
      console.log(data);
    }
    fetchData();
  },[findNewPokemon]);
  
  return (
    <div className='d-flex-a-center-j-space-evenly-column'>
      <Recorde atual={pontuacao} maximo={0} />
      {pokemonData ? (
        <>
          <Pokemon urlImagem={pokemonData.imageUrl} isRevelado={true} />
          <Input
            valueInput={pokemonChute}
            setInputValue={handleInputValue}
            keyUpEvent={handleKeyUpInputEvent}
            corDeFundo={corDeFundoInput}
          />
          <Dica tipo={pokemonData.type}/>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  )
}

export default App;
