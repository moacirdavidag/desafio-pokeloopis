import { useContext } from 'react';

import { Game } from './components/Game';
import { StartScreen } from './components/StartScreen';
import { PlayingContext } from './context/PlayingContext';

function App() {
  const { isPlaying } = useContext(PlayingContext);
  return (
    <>
      {isPlaying ? <Game /> : <StartScreen />}
    </>
  )
}

export default App;
