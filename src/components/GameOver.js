import React, { useState, useEffect } from 'react';
import { Transition } from '@tailwindui/react';
import { gameOverMessages } from '../constants';
import PropTypes from 'prop-types';

const GameOver = ({ gameResult, handleGoToMenu, handlePlayAgain }) => {
  const [show, setShow] = useState(false);
  console.log('gameResult', typeof gameResult);
  useEffect(() => {
    if (!!gameResult?.side) {
      setTimeout(() => {
        setShow(true);
      }, 1500);
    } else {
      setShow(false);
    }
  }, [gameResult]);
  return (
    <Transition
      as="div"
      show={show}
      enter="transition-all duration-500"
      enterFrom="opacity-0 -translate-x-32"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-500"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-32"
      className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-purple-900 text-white border-2 border-purple-400 rounded-lg p-4 w-full max-w-lg drop-shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl">{gameOverMessages[gameResult?.side]}</h2>
        </div>
        <div className="text-center">
          <button
            className="uppercase bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-900 rounded-md py-2 px-4 transition-all hover:scale-110 duration-300 mr-4"
            onClick={handleGoToMenu}
          >
            Return to Menu
          </button>
          <button
            className="uppercase bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-900 rounded-md py-2 px-4 transition-all hover:scale-110 duration-300"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      </div>
    </Transition>
  );
};

GameOver.propTypes = {
  gameResult: PropTypes.shape({
    side: PropTypes.string,
  }),
  handleGoToMenu: PropTypes.func.isRequired,
  handlePlayAgain: PropTypes.func.isRequired,
};

export default GameOver;
