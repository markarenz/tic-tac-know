import React, { useState } from 'react';
import { AI_LEVELS, APP_STATES, X } from './constants';
import { Menu, Game } from './components';

const App = () => {
  const [appState, setAppState] = useState(APP_STATES.MENU);
  const [aiLevel, setAiLevel] = useState(AI_LEVELS.AI_LEVEL_RND);
  const [playerSide, setPlayerSide] = useState(X);
  const handleSelectAiLevel = (level) => {
    setAiLevel(level);
  };
  const handleSelectSide = (side) => {
    setPlayerSide(side);
  };
  const goToGame = () => {
    setAppState(APP_STATES.GAME);
  };
  const goToMenu = () => {
    setAppState(APP_STATES.MENU);
  };
  return (
    <div className="App">
      <div className="relative h-full min-h-screen">
        {appState === APP_STATES.MENU && (
          <Menu
            handleSelectAiLevel={handleSelectAiLevel}
            handleSelectSide={handleSelectSide}
            aiLevel={aiLevel}
            playerSide={playerSide}
            goToGame={goToGame}
          />
        )}
        {appState === APP_STATES.GAME && (
          <Game aiLevel={aiLevel} playerSide={playerSide} goToMenu={goToMenu} />
        )}
      </div>
    </div>
  );
};

export default App;
