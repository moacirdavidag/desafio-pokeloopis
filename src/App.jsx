import { useState } from 'react';
import { Recorde } from './components/Recorde';
import { Pokemon } from './components/Pokemon';
import { Input } from './components/Input';
import { Dica } from './components/Dica';

function App() {

  const [jogando, setJogando] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  const [pokemonChute, setPokemonChute] = useState('');
  const [acertouChute, setAcertouChute] = useState(true);
  const [corDeFundoInput, setCorDeFundoInput] = useState("#bebebe");

  const handleInputValue = (e) => {
    setPokemonChute(e);
  }

  const handleKeyUpInputEvent = (e) => {
    if(e.keyCode === 13 || e.code === "Enter") {
      setCorDeFundoInput("#18DF20");
    }
  }

  return (
    <div className='d-flex-a-center-j-space-evenly-column'>
      <Recorde atual={pontuacao} maximo={0} />
      <div className='container d-flex-a-center-j-space-evenly-column'>
        <Pokemon urlImagem={'/12.png'} isRevelado={true} />
        <Input valueInput={pokemonChute} setInputValue={handleInputValue} 
        keyUpEvent={handleKeyUpInputEvent} corDeFundo={corDeFundoInput} />
        <Dica tipo={"Água"}/>
      </div>
    </div>
  )
}

export default App;
