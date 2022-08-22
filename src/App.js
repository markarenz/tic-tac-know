// import React, { useState } from 'react';
import React from 'react';

import { Game, Bg } from './components';

const App = () => {
  // const [isTraining, setIsTraining] = useState(true);
  // const [appState, setAppState] = useState('game');
  // Global Stats, read from localStorage...
  return (
    <div className="App">
      <div className="relative h-full min-h-screen">
        <Bg />
        {/* <Menu /> */}
        <Game />
      </div>
    </div>
  );
};

export default App;
